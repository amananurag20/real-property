import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { NotificationService } from '../notification/notification.service';
import { AdminLogService } from '../admin-log/admin-log.service';
import { CreateServiceProviderProfileDto } from './dto/create-service-provider-profile.dto';
import { UpdateServiceProviderProfileDto } from './dto/update-service-provider-profile.dto';
import { ListServiceProviderProfilesDto } from './dto/list-service-provider-profiles.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';
import { ApprovalStatus, NotificationType, AdminAction } from '../../generated/prisma/enums';

@Injectable()
export class ServiceProviderProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly adminLogService: AdminLogService,
  ) {}

  /** Create a service provider profile (authenticated) */
  async create(userId: string, dto: CreateServiceProviderProfileDto) {
    // Check if user already has a profile
    const existing = await this.prisma.client.serviceProviderProfile.findUnique({
      where: { userId },
    });
    if (existing) {
      throw new ConflictException('Service provider profile already exists for this user.');
    }

    return this.prisma.client.serviceProviderProfile.create({
      data: {
        userId,
        ...dto,
        approvalStatus: ApprovalStatus.PENDING,
      },
    });
  }

  /** Get own profile (authenticated) */
  async findMe(userId: string) {
    const profile = await this.prisma.client.serviceProviderProfile.findFirst({
      where: {
        userId,
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Service provider profile not found.');
    }

    return profile;
  }

  /** Update own profile (authenticated) */
  async updateMe(userId: string, dto: UpdateServiceProviderProfileDto) {
    const profile = await this.prisma.client.serviceProviderProfile.findFirst({
      where: {
        userId,
        isDeleted: false,
      },
    });

    if (!profile) {
      throw new NotFoundException('Service provider profile not found.');
    }

    return this.prisma.client.serviceProviderProfile.update({
      where: { id: profile.id },
      data: dto,
    });
  }

  /** Soft delete own profile (authenticated) */
  async softDeleteMe(userId: string) {
    const profile = await this.prisma.client.serviceProviderProfile.findFirst({
      where: {
        userId,
        isDeleted: false,
      },
    });

    if (!profile) {
      throw new NotFoundException('Service provider profile not found.');
    }

    await this.prisma.client.serviceProviderProfile.update({
      where: { id: profile.id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return { message: 'Service provider profile deleted successfully.' };
  }

  /** List all service provider profiles (public, approved only) */
  async findAll(dto: ListServiceProviderProfilesDto) {
    const { skip, take, orderBy } = dto.toPrismaArgs();

    const where: Record<string, unknown> = {
      approvalStatus: ApprovalStatus.APPROVED,
      isVerified: true,
      isDeleted: false,
    };

    // Filter by type
    if (dto.type) {
      where.type = dto.type;
    }

    // Filter by location (case-insensitive contains)
    if (dto.location) {
      where.location = {
        contains: dto.location,
        mode: 'insensitive',
      };
    }

    // Filter by minimum rating
    if (dto.minRating !== undefined) {
      where.rating = {
        gte: dto.minRating,
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.client.serviceProviderProfile.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          user: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
      }),
      this.prisma.client.serviceProviderProfile.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  /** Get a single service provider profile by ID (public, approved only) */
  async findOne(id: string) {
    const profile = await this.prisma.client.serviceProviderProfile.findFirst({
      where: {
        id,
        approvalStatus: ApprovalStatus.APPROVED,
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
            email: true,
            phone: true,
          },
        },
        reviews: {
          where: {
            isApproved: true,
            isDeleted: false,
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Service provider profile not found or not approved.');
    }

    return profile;
  }

  /** [ADMIN] Verify a service provider */
  async verifyProvider(id: string, adminId: string) {
    const profile = await this.prisma.client.serviceProviderProfile.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!profile) {
      throw new NotFoundException('Service provider profile not found.');
    }

    const updated = await this.prisma.client.serviceProviderProfile.update({
      where: { id },
      data: { isVerified: true },
    });

    // Send notification
    await this.notificationService.createNotification(
      profile.userId,
      NotificationType.PROFILE_VERIFIED,
      {
        title: 'Profile Verified',
        message: 'Your service provider profile has been verified by admin.',
        referenceType: 'ServiceProviderProfile',
        referenceId: id,
        actionUrl: `/service-provider-profile/${id}`,
      },
    );

    // Log admin action
    await this.adminLogService.createLog(adminId, AdminAction.SERVICE_PROVIDER_APPROVED, {
      description: `Verified service provider profile for ${profile.user.name}`,
      targetType: 'ServiceProviderProfile',
      targetId: id,
      previousState: { isVerified: profile.isVerified },
      newState: { isVerified: true },
    });

    return updated;
  }

  /** [ADMIN] Update approval status */
  async updateApprovalStatus(id: string, status: ApprovalStatus, adminId: string) {
    const profile = await this.prisma.client.serviceProviderProfile.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!profile) {
      throw new NotFoundException('Service provider profile not found.');
    }

    const updated = await this.prisma.client.serviceProviderProfile.update({
      where: { id },
      data: { approvalStatus: status },
    });

    // Send notification
    const notificationType =
      status === ApprovalStatus.APPROVED
        ? NotificationType.PROPERTY_APPROVED
        : NotificationType.PROPERTY_REJECTED;

    await this.notificationService.createNotification(
      profile.userId,
      notificationType,
      {
        title: `Profile ${status}`,
        message: `Your service provider profile has been ${status.toLowerCase()} by admin.`,
        referenceType: 'ServiceProviderProfile',
        referenceId: id,
        actionUrl: `/service-provider-profile/${id}`,
      },
    );

    // Log admin action
    const adminAction =
      status === ApprovalStatus.APPROVED
        ? AdminAction.SERVICE_PROVIDER_APPROVED
        : AdminAction.PROPERTY_REJECTED;

    await this.adminLogService.createLog(adminId, adminAction, {
      description: `Updated approval status to ${status} for service provider ${profile.user.name}`,
      targetType: 'ServiceProviderProfile',
      targetId: id,
      previousState: { approvalStatus: profile.approvalStatus },
      newState: { approvalStatus: status },
    });

    return updated;
  }
}
