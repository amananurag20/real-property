import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { NotificationService } from '../notification/notification.service';
import { AdminLogService } from '../admin-log/admin-log.service';
import { ApprovalStatus } from '../../generated/prisma/enums';
import { NotificationType } from '../../generated/prisma/enums';
import { AdminAction } from '../../generated/prisma/enums';
import { CreateAgentProfileDto } from './dto/create-agent-profile.dto';
import { UpdateAgentProfileDto } from './dto/update-agent-profile.dto';
import { ListAgentProfilesDto } from './dto/list-agent-profiles.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class AgentProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly adminLogService: AdminLogService,
  ) {}

  async create(userId: string, dto: CreateAgentProfileDto) {
    // Check if agent profile already exists
    const existing = await this.prisma.client.agentProfile.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new ConflictException('Agent profile already exists for this user');
    }

    return this.prisma.client.agentProfile.create({
      data: {
        userId,
        agencyName: dto.agencyName,
        serviceAreas: dto.serviceAreas,
        experience: dto.experience,
        specialization: dto.specialization,
        bio: dto.bio,
        profilePhoto: dto.profilePhoto,
        languages: dto.languages,
        contactPhone: dto.contactPhone,
        contactEmail: dto.contactEmail,
        whatsappNumber: dto.whatsappNumber,
        approvalStatus: ApprovalStatus.PENDING,
      },
    });
  }

  async findMe(userId: string) {
    const profile = await this.prisma.client.agentProfile.findUnique({
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
      throw new NotFoundException('Agent profile not found');
    }

    return profile;
  }

  async updateMe(userId: string, dto: UpdateAgentProfileDto) {
    await this.findMe(userId); // Check if exists

    return this.prisma.client.agentProfile.update({
      where: { userId },
      data: {
        agencyName: dto.agencyName,
        serviceAreas: dto.serviceAreas,
        experience: dto.experience,
        specialization: dto.specialization,
        bio: dto.bio,
        profilePhoto: dto.profilePhoto,
        languages: dto.languages,
        contactPhone: dto.contactPhone,
        contactEmail: dto.contactEmail,
        whatsappNumber: dto.whatsappNumber,
      },
    });
  }

  async softDeleteMe(userId: string) {
    await this.findMe(userId); // Check if exists

    return this.prisma.client.agentProfile.update({
      where: { userId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async findAll(dto: ListAgentProfilesDto) {
    const { page = 1, limit = 10, serviceArea, minRating } = dto;
    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: false,
      approvalStatus: ApprovalStatus.APPROVED,
      isVerified: true,
    };

    if (serviceArea) {
      where.serviceAreas = { has: serviceArea };
    }

    if (minRating !== undefined) {
      where.averageRating = { gte: minRating };
    }

    const [data, total] = await Promise.all([
      this.prisma.client.agentProfile.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.agentProfile.count({ where }),
    ]);

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  async findOne(id: string) {
    const profile = await this.prisma.client.agentProfile.findUnique({
      where: {
        id,
        isDeleted: false,
        approvalStatus: ApprovalStatus.APPROVED,
      },
      include: {
        user: {
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
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Agent profile not found');
    }

    return profile;
  }

  async verifyAgent(id: string, adminId: string) {
    const profile = await this.prisma.client.agentProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException('Agent profile not found');
    }

    const updatedProfile = await this.prisma.client.agentProfile.update({
      where: { id },
      data: { isVerified: true },
    });

    // Create notification
    await this.notificationService.create({
      userId: profile.userId,
      type: NotificationType.PROFILE_VERIFIED,
      title: 'Agent Profile Verified',
      message: 'Your agent profile has been verified by an administrator.',
    });

    // Create admin log
    await this.adminLogService.create({
      adminId,
      action: AdminAction.AGENT_VERIFIED,
      targetType: 'agent_profile',
      targetId: id,
      details: { agentProfileId: id },
    });

    return updatedProfile;
  }

  async updateApprovalStatus(
    id: string,
    status: ApprovalStatus,
    adminId: string,
  ) {
    const profile = await this.prisma.client.agentProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException('Agent profile not found');
    }

    const updatedProfile = await this.prisma.client.agentProfile.update({
      where: { id },
      data: { approvalStatus: status },
    });

    // Notify the agent
    await this.notificationService.create({
      userId: profile.userId,
      type: NotificationType.PROFILE_APPROVED,
      title: `Agent Profile ${status}`,
      message: `Your agent profile has been ${status.toLowerCase()} by an administrator.`,
    });

    // Log admin action
    await this.adminLogService.create({
      adminId,
      action: AdminAction.APPROVAL_UPDATED,
      targetType: 'agent_profile',
      targetId: id,
      details: { agentProfileId: id, newStatus: status },
    });

    return updatedProfile;
  }
}
