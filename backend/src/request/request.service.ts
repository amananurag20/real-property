import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { NotificationService } from '../notification/notification.service';
import { AdminLogService } from '../admin-log/admin-log.service';
import {
  RequestStatus,
  ApprovalStatus,
  Role,
  NotificationType,
  AdminAction,
} from '../../generated/prisma/enums';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ListRequestsDto } from './dto/list-requests.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class RequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly adminLogService: AdminLogService,
  ) {}

  /** Create a new property request */
  async create(userId: string, dto: CreateRequestDto) {
    // Validate budgetMin <= budgetMax
    if (dto.budgetMin > dto.budgetMax) {
      throw new BadRequestException(
        'budgetMin cannot be greater than budgetMax',
      );
    }

    // Validate minArea <= maxArea if both provided
    if (dto.minArea && dto.maxArea && dto.minArea > dto.maxArea) {
      throw new BadRequestException('minArea cannot be greater than maxArea');
    }

    const request = await this.prisma.client.request.create({
      data: {
        postedById: userId,
        requestType: dto.requestType,
        title: dto.title,
        budgetMin: dto.budgetMin,
        budgetMax: dto.budgetMax,
        preferredPropertyType: dto.preferredPropertyType,
        preferredLocations: dto.preferredLocations,
        preferredState: dto.preferredState,
        minArea: dto.minArea,
        maxArea: dto.maxArea,
        minBedrooms: dto.minBedrooms,
        timeline: dto.timeline,
        notes: dto.notes,
        requirements: dto.requirements,
        contactPreference: dto.contactPreference,
        status: RequestStatus.OPEN,
        approvalStatus: ApprovalStatus.PENDING,
      },
      include: {
        postedBy: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return request;
  }

  /** Find all requests posted by the current user (paginated) */
  async findMyRequests(userId: string, dto: ListRequestsDto) {
    const { skip, take, orderBy } = dto.toPrismaArgs();

    const where: Record<string, unknown> = {
      postedById: userId,
      isDeleted: false,
    };

    // Apply filters
    if (dto.requestType) {
      where.requestType = dto.requestType;
    }

    if (dto.preferredState) {
      where.preferredState = {
        contains: dto.preferredState,
        mode: 'insensitive',
      };
    }

    if (dto.minBudget !== undefined) {
      where.budgetMax = { gte: dto.minBudget };
    }

    if (dto.maxBudget !== undefined) {
      where.budgetMin = { lte: dto.maxBudget };
    }

    // Apply search
    if (dto.search) {
      where.OR = [
        { title: { contains: dto.search, mode: 'insensitive' } },
        { notes: { contains: dto.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.client.request.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          postedBy: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
      }),
      this.prisma.client.request.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  /** Find all public requests (approved, open, not deleted) */
  async findAll(dto: ListRequestsDto) {
    const { skip, take, orderBy } = dto.toPrismaArgs();

    const where: Record<string, unknown> = {
      isDeleted: false,
      approvalStatus: ApprovalStatus.APPROVED,
      status: RequestStatus.OPEN,
    };

    // Apply filters
    if (dto.requestType) {
      where.requestType = dto.requestType;
    }

    if (dto.preferredState) {
      where.preferredState = {
        contains: dto.preferredState,
        mode: 'insensitive',
      };
    }

    if (dto.minBudget !== undefined) {
      where.budgetMax = { gte: dto.minBudget };
    }

    if (dto.maxBudget !== undefined) {
      where.budgetMin = { lte: dto.maxBudget };
    }

    // Apply search
    if (dto.search) {
      where.OR = [
        { title: { contains: dto.search, mode: 'insensitive' } },
        { notes: { contains: dto.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.client.request.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          postedBy: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.client.request.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  /** Find a single request by ID with access control */
  async findOne(id: string, userId?: string, userRole?: Role) {
    const request = await this.prisma.client.request.findUnique({
      where: { id },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException('Request not found.');
    }

    if (request.isDeleted) {
      throw new NotFoundException('Request not found.');
    }

    // Access control
    const isOwner = userId && request.postedById === userId;
    const isAdminOrAgent =
      userRole && [Role.ADMIN, Role.AGENT].includes(userRole as any);
    const isApproved = request.approvalStatus === ApprovalStatus.APPROVED;

    // Owner can always see their own request
    if (isOwner) {
      return request;
    }

    // Admin and agents can see approved requests
    if (isAdminOrAgent && isApproved) {
      return request;
    }

    // Public users can only see approved requests
    if (isApproved) {
      return request;
    }

    // Otherwise, access denied
    throw new ForbiddenException('Access denied to this request.');
  }

  /** Update a request (owner only) */
  async update(userId: string, id: string, dto: UpdateRequestDto) {
    const request = await this.prisma.client.request.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Request not found.');
    }

    if (request.postedById !== userId) {
      throw new ForbiddenException('You can only update your own requests.');
    }

    if (request.isDeleted) {
      throw new NotFoundException('Request not found.');
    }

    // Validate budgets if both provided
    const newBudgetMin = dto.budgetMin ?? request.budgetMin;
    const newBudgetMax = dto.budgetMax ?? request.budgetMax;
    if (newBudgetMin > newBudgetMax) {
      throw new BadRequestException(
        'budgetMin cannot be greater than budgetMax',
      );
    }

    // Validate areas if both provided
    const newMinArea = dto.minArea ?? request.minArea;
    const newMaxArea = dto.maxArea ?? request.maxArea;
    if (newMinArea && newMaxArea && newMinArea > newMaxArea) {
      throw new BadRequestException('minArea cannot be greater than maxArea');
    }

    return this.prisma.client.request.update({
      where: { id },
      data: {
        requestType: dto.requestType,
        title: dto.title,
        budgetMin: dto.budgetMin,
        budgetMax: dto.budgetMax,
        preferredPropertyType: dto.preferredPropertyType,
        preferredLocations: dto.preferredLocations,
        preferredState: dto.preferredState,
        minArea: dto.minArea,
        maxArea: dto.maxArea,
        minBedrooms: dto.minBedrooms,
        timeline: dto.timeline,
        notes: dto.notes,
        requirements: dto.requirements,
        contactPreference: dto.contactPreference,
      },
      include: {
        postedBy: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  /** Soft delete a request (owner only) */
  async softDelete(userId: string, id: string) {
    const request = await this.prisma.client.request.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Request not found.');
    }

    if (request.postedById !== userId) {
      throw new ForbiddenException('You can only delete your own requests.');
    }

    if (request.isDeleted) {
      throw new NotFoundException('Request already deleted.');
    }

    await this.prisma.client.request.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return { message: 'Request deleted successfully.' };
  }

  /** Update approval status (admin only) */
  async updateApprovalStatus(
    id: string,
    status: ApprovalStatus,
    adminId: string,
  ) {
    const request = await this.prisma.client.request.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Request not found.');
    }

    if (request.isDeleted) {
      throw new NotFoundException('Request not found.');
    }

    // Update approval status
    const updatedRequest = await this.prisma.client.request.update({
      where: { id },
      data: {
        approvalStatus: status,
      },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Send notification to the request owner
    const notificationType =
      status === ApprovalStatus.APPROVED
        ? NotificationType.REQUEST_APPROVED
        : NotificationType.REQUEST_REJECTED;

    const notificationTitle =
      status === ApprovalStatus.APPROVED
        ? 'Request Approved'
        : 'Request Rejected';

    const notificationMessage =
      status === ApprovalStatus.APPROVED
        ? `Your request "${request.title}" has been approved and is now visible to agents.`
        : `Your request "${request.title}" has been rejected. Please review and resubmit if needed.`;

    await this.notificationService.createNotification(
      request.postedById,
      notificationType,
      {
        title: notificationTitle,
        message: notificationMessage,
        referenceType: 'Request',
        referenceId: id,
        actionUrl: `/requests/${id}`,
      },
    );

    // Log admin action
    const adminAction =
      status === ApprovalStatus.APPROVED
        ? AdminAction.REQUEST_APPROVED
        : AdminAction.REQUEST_REJECTED;

    await this.adminLogService.createLog(adminId, adminAction, {
      targetType: 'Request',
      targetId: id,
      description: `Request "${request.title}" ${status.toLowerCase()} by admin`,
      previousState: { approvalStatus: request.approvalStatus },
      newState: { approvalStatus: status },
    });

    return updatedRequest;
  }
}
