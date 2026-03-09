import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { NotificationService } from '../notification/notification.service';
import { AdminLogService } from '../admin-log/admin-log.service';
import {
  PropertyStatus,
  ApprovalStatus,
  NotificationType,
  AdminAction,
} from '../../generated/prisma/enums';
import { generateSlug } from '../common/utils/slug.util';
import { buildPaginationMeta } from '../common/dto/pagination.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ListPropertiesDto } from './dto/list-properties.dto';
import { AddImagesDto } from './dto/add-images.dto';

@Injectable()
export class PropertyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly adminLogService: AdminLogService,
  ) {}

  /** Create a new property listing */
  async create(userId: string, dto: CreatePropertyDto) {
    const slug = generateSlug(dto.title);

    const property = await this.prisma.client.property.create({
      data: {
        ...dto,
        slug,
        listedById: userId,
        approvalStatus: ApprovalStatus.PENDING,
        status: PropertyStatus.AVAILABLE,
      },
    });

    return property;
  }

  /** Find all approved properties (public) with filters */
  async findAll(dto: ListPropertiesDto) {
    const { skip, take, orderBy } = dto.toPrismaArgs();

    const where: Record<string, unknown> = {
      isDeleted: false,
      approvalStatus: ApprovalStatus.APPROVED,
      status: PropertyStatus.AVAILABLE,
    };

    if (dto.propertyType) where.propertyType = dto.propertyType;
    if (dto.category) where.category = dto.category;
    if (dto.state) {
      where.state = { contains: dto.state, mode: 'insensitive' };
    }
    if (dto.city) {
      where.city = { contains: dto.city, mode: 'insensitive' };
    }
    if (dto.minPrice !== undefined || dto.maxPrice !== undefined) {
      where.price = {};
      if (dto.minPrice !== undefined)
        (where.price as Record<string, unknown>).gte = dto.minPrice;
      if (dto.maxPrice !== undefined)
        (where.price as Record<string, unknown>).lte = dto.maxPrice;
    }
    if (dto.minArea !== undefined || dto.maxArea !== undefined) {
      where.areaSize = {};
      if (dto.minArea !== undefined)
        (where.areaSize as Record<string, unknown>).gte = dto.minArea;
      if (dto.maxArea !== undefined)
        (where.areaSize as Record<string, unknown>).lte = dto.maxArea;
    }
    if (dto.minBedrooms !== undefined) {
      where.bedrooms = { gte: dto.minBedrooms };
    }

    // Search filter
    if (dto.search) {
      where.OR = [
        { title: { contains: dto.search, mode: 'insensitive' } },
        { description: { contains: dto.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.client.property.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      }),
      this.prisma.client.property.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  /** Find a property by slug (public) */
  async findBySlug(slug: string) {
    const property = await this.prisma.client.property.findFirst({
      where: {
        slug,
        isDeleted: false,
        approvalStatus: ApprovalStatus.APPROVED,
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        listedBy: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        reviews: {
          where: {
            isApproved: true,
            isDeleted: false,
          },
          include: {
            author: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!property) throw new NotFoundException('Property not found.');

    return property;
  }

  /** Find my listings (authenticated user) */
  async findMyListings(userId: string, dto: ListPropertiesDto) {
    const { skip, take, orderBy } = dto.toPrismaArgs();

    const where: Record<string, unknown> = {
      listedById: userId,
      isDeleted: false,
    };

    const [items, total] = await Promise.all([
      this.prisma.client.property.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      }),
      this.prisma.client.property.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  /** Update a property (owner only) */
  async update(userId: string, propertyId: string, dto: UpdatePropertyDto) {
    const property = await this.prisma.client.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) throw new NotFoundException('Property not found.');
    if (property.listedById !== userId)
      throw new ForbiddenException(
        'You do not have permission to update this property.',
      );

    return this.prisma.client.property.update({
      where: { id: propertyId },
      data: dto,
    });
  }

  /** Soft delete a property (owner only) */
  async softDelete(userId: string, propertyId: string) {
    const property = await this.prisma.client.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) throw new NotFoundException('Property not found.');
    if (property.listedById !== userId)
      throw new ForbiddenException(
        'You do not have permission to delete this property.',
      );

    await this.prisma.client.property.update({
      where: { id: propertyId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return { message: 'Property deleted successfully.' };
  }

  /** Add images to a property */
  async addImages(userId: string, propertyId: string, dto: AddImagesDto) {
    const property = await this.prisma.client.property.findUnique({
      where: { id: propertyId },
      include: { images: true },
    });

    if (!property) throw new NotFoundException('Property not found.');
    if (property.listedById !== userId)
      throw new ForbiddenException(
        'You do not have permission to add images to this property.',
      );

    // If no existing images, set the first new image as primary
    const hasExistingImages = property.images.length > 0;
    const imagesToCreate = dto.images.map((img: any, index: number) => ({
      ...img,
      propertyId,
      isPrimary:
        !hasExistingImages && index === 0 ? true : (img.isPrimary ?? false),
    }));

    await this.prisma.client.propertyImage.createMany({
      data: imagesToCreate,
    });

    return { message: 'Images added successfully.' };
  }

  /** Delete an image from a property */
  async deleteImage(userId: string, propertyId: string, imageId: string) {
    const property = await this.prisma.client.property.findUnique({
      where: { id: propertyId },
      include: { images: true },
    });

    if (!property) throw new NotFoundException('Property not found.');
    if (property.listedById !== userId)
      throw new ForbiddenException(
        'You do not have permission to delete images from this property.',
      );

    const image = await this.prisma.client.propertyImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.propertyId !== propertyId)
      throw new NotFoundException('Image not found.');

    const wasPrimary = image.isPrimary;

    await this.prisma.client.propertyImage.delete({
      where: { id: imageId },
    });

    // If the deleted image was primary, set another image as primary
    if (wasPrimary) {
      const remainingImages = property.images.filter(
        (img: any) => img.id !== imageId,
      );
      if (remainingImages.length > 0) {
        await this.prisma.client.propertyImage.update({
          where: { id: remainingImages[0].id },
          data: { isPrimary: true },
        });
      }
    }

    return { message: 'Image deleted successfully.' };
  }

  /** Set an image as primary */
  async setPrimaryImage(userId: string, propertyId: string, imageId: string) {
    const property = await this.prisma.client.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) throw new NotFoundException('Property not found.');
    if (property.listedById !== userId)
      throw new ForbiddenException(
        'You do not have permission to modify images for this property.',
      );

    const image = await this.prisma.client.propertyImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.propertyId !== propertyId)
      throw new NotFoundException('Image not found.');

    // Set all images to non-primary
    await this.prisma.client.propertyImage.updateMany({
      where: { propertyId },
      data: { isPrimary: false },
    });

    // Set target image as primary
    await this.prisma.client.propertyImage.update({
      where: { id: imageId },
      data: { isPrimary: true },
    });

    return { message: 'Primary image updated successfully.' };
  }

  /** Increment view count for a property */
  async incrementViewCount(slug: string) {
    await this.prisma.client.property.update({
      where: { slug },
      data: {
        viewCount: { increment: 1 },
      },
    });

    return { message: 'View count incremented.' };
  }

  /** Update approval status (ADMIN only) */
  async updateApprovalStatus(
    propertyId: string,
    status: ApprovalStatus,
    adminId: string,
  ) {
    const property = await this.prisma.client.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) throw new NotFoundException('Property not found.');

    const updatedProperty = await this.prisma.client.property.update({
      where: { id: propertyId },
      data: { approvalStatus: status },
    });

    // Notify property owner
    const notificationType =
      status === ApprovalStatus.APPROVED
        ? NotificationType.PROPERTY_APPROVED
        : NotificationType.PROPERTY_REJECTED;

    await this.notificationService.createNotification(
      property.listedById,
      notificationType,
      {
        title: `Property ${status}`,
        message: `Your property "${property.title}" has been ${status.toLowerCase()}.`,
        referenceType: 'property',
        referenceId: propertyId,
        actionUrl: `/property/${property.slug}`,
      },
    );

    // Create admin log
    const adminAction =
      status === ApprovalStatus.APPROVED
        ? AdminAction.PROPERTY_APPROVED
        : AdminAction.PROPERTY_REJECTED;

    await this.adminLogService.createLog(adminId, adminAction, {
      description: `Property "${property.title}" ${status.toLowerCase()}.`,
      targetType: 'property',
      targetId: propertyId,
      previousState: { approvalStatus: property.approvalStatus },
      newState: { approvalStatus: status },
    });

    return updatedProperty;
  }

  /** Feature a property (ADMIN only) */
  async featureProperty(
    propertyId: string,
    featuredUntil: Date,
    adminId: string,
  ) {
    const property = await this.prisma.client.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) throw new NotFoundException('Property not found.');

    const updatedProperty = await this.prisma.client.property.update({
      where: { id: propertyId },
      data: {
        isFeatured: true,
        featuredUntil,
      },
    });

    // Notify property owner
    await this.notificationService.createNotification(
      property.listedById,
      NotificationType.SYSTEM,
      {
        title: 'Property Featured',
        message: `Your property "${property.title}" has been featured until ${featuredUntil.toDateString()}.`,
        referenceType: 'property',
        referenceId: propertyId,
        actionUrl: `/property/${property.slug}`,
      },
    );

    // Create admin log
    await this.adminLogService.createLog(adminId, AdminAction.CONTENT_EDITED, {
      description: `Property "${property.title}" featured until ${featuredUntil.toISOString()}.`,
      targetType: 'property',
      targetId: propertyId,
      previousState: {
        isFeatured: property.isFeatured,
        featuredUntil: property.featuredUntil,
      },
      newState: {
        isFeatured: true,
        featuredUntil,
      },
    });

    return updatedProperty;
  }
}
