import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ListReviewsDto } from './dto/list-reviews.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';
import { AdminAction } from '../../generated/prisma/enums';
import { AdminLogService } from '../admin-log/admin-log.service';

@Injectable()
export class ReviewService {
  constructor(
    private prisma: PrismaService,
    private adminLogService: AdminLogService,
  ) {}

  async create(userId: string, dto: CreateReviewDto) {
    // Validate exactly one target ID is provided
    const targetIds = [
      dto.propertyId,
      dto.agentProfileId,
      dto.serviceProviderProfileId,
    ].filter(Boolean);
    if (targetIds.length !== 1) {
      throw new BadRequestException(
        'Exactly one of propertyId, agentProfileId, or serviceProviderProfileId must be provided',
      );
    }

    const review = await this.prisma.client.review.create({
      data: {
        rating: dto.rating,
        title: dto.title,
        comment: dto.comment,
        authorId: userId,
        propertyId: dto.propertyId,
        agentProfileId: dto.agentProfileId,
        serviceProviderProfileId: dto.serviceProviderProfileId,
        isApproved: false,
      },
    });

    return review;
  }

  async findAll(dto: ListReviewsDto) {
    const {
      page = 1,
      limit = 10,
      propertyId,
      agentProfileId,
      serviceProviderProfileId,
      minRating,
    } = dto;
    const skip = (page - 1) * limit;

    const where: any = {
      isApproved: true,
      isDeleted: false,
    };

    if (propertyId) where.propertyId = propertyId;
    if (agentProfileId) where.agentProfileId = agentProfileId;
    if (serviceProviderProfileId)
      where.serviceProviderProfileId = serviceProviderProfileId;
    if (minRating) where.rating = { gte: minRating };

    const [data, total] = await Promise.all([
      this.prisma.client.review.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.review.count({ where }),
    ]);

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  async findOne(id: string) {
    const review = await this.prisma.client.review.findFirst({
      where: {
        id,
        isApproved: true,
        isDeleted: false,
      },
      include: {
        author: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(userId: string, id: string, dto: UpdateReviewDto) {
    const review = await this.prisma.client.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.authorId !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    const updated = await this.prisma.client.review.update({
      where: { id },
      data: {
        ...dto,
        isApproved: false, // Reset approval status for moderation
      },
    });

    return updated;
  }

  async softDelete(userId: string, id: string) {
    const review = await this.prisma.client.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    await this.prisma.client.review.update({
      where: { id },
      data: { isDeleted: true },
    });

    // Recalculate rating for the target entity
    await this.recalculateRating(review);

    return { message: 'Review deleted successfully' };
  }

  async approveReview(id: string, adminId: string) {
    const review = await this.prisma.client.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.prisma.client.review.update({
      where: { id },
      data: { isApproved: true },
    });

    // Recalculate rating for the target entity
    await this.recalculateRating(review);

    await this.adminLogService.createLog(adminId, AdminAction.CONTENT_EDITED, {
      targetType: 'Review',
      targetId: id,
      description: `Approved review ${id}`,
    });

    return { message: 'Review approved successfully' };
  }

  async rejectReview(id: string, adminId: string) {
    const review = await this.prisma.client.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.prisma.client.review.update({
      where: { id },
      data: { isApproved: false },
    });

    await this.adminLogService.createLog(adminId, AdminAction.CONTENT_EDITED, {
      targetType: 'Review',
      targetId: id,
      description: `Rejected review ${id}`,
    });

    return { message: 'Review rejected successfully' };
  }

  private async recalculateRating(review: any) {
    let targetModel: any;
    let targetId: string;

    if (review.propertyId) {
      targetModel = this.prisma.client.property;
      targetId = review.propertyId;
    } else if (review.agentProfileId) {
      targetModel = this.prisma.client.agentProfile;
      targetId = review.agentProfileId;
    } else if (review.serviceProviderProfileId) {
      targetModel = this.prisma.client.serviceProviderProfile;
      targetId = review.serviceProviderProfileId;
    } else {
      return; // No target to update
    }

    // Get all approved reviews for this target
    const whereCondition: any = {
      isApproved: true,
      isDeleted: false,
    };

    if (review.propertyId) whereCondition.propertyId = targetId;
    else if (review.agentProfileId) whereCondition.agentProfileId = targetId;
    else if (review.serviceProviderProfileId)
      whereCondition.serviceProviderProfileId = targetId;

    const reviews = await this.prisma.client.review.findMany({
      where: whereCondition,
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce(
            (sum: number, r: { rating: number }) => sum + r.rating,
            0,
          ) / totalReviews
        : 0;

    // Update target entity
    await targetModel.update({
      where: { id: targetId },
      data: {
        rating: averageRating,
        totalReviews,
      },
    });
  }
}
