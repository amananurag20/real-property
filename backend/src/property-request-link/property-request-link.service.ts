import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { NotificationService } from '../notification/notification.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { ListLinksDto } from './dto/list-links.dto';
import { BuyerResponseDto } from './dto/buyer-response.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';
import {
  TriangleLinkStatus,
  ApprovalStatus,
  Role,
  NotificationType,
} from '../../generated/prisma/enums';

@Injectable()
export class PropertyRequestLinkService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async createLink(agentUserId: string, dto: CreateLinkDto) {
    // 1. Find and validate agent profile
    const agentProfile = await this.prisma.client.agentProfile.findUnique({
      where: { userId: agentUserId },
    });

    if (!agentProfile) {
      throw new NotFoundException('Agent profile not found');
    }

    if (
      !agentProfile.isVerified ||
      agentProfile.approvalStatus !== ApprovalStatus.APPROVED
    ) {
      throw new ForbiddenException(
        'Agent profile must be verified and approved',
      );
    }

    // 2. Check property exists and is valid
    const property = await this.prisma.client.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property || property.isDeleted) {
      throw new NotFoundException('Property not found');
    }

    if (property.approvalStatus !== ApprovalStatus.APPROVED) {
      throw new BadRequestException('Property must be approved');
    }

    // 3. Check request exists and is valid
    const request = await this.prisma.client.propertyRequest.findUnique({
      where: { id: dto.requestId },
    });

    if (!request || request.isDeleted) {
      throw new NotFoundException('Property request not found');
    }

    if (request.approvalStatus !== ApprovalStatus.APPROVED) {
      throw new BadRequestException('Property request must be approved');
    }

    if (request.status !== 'OPEN') {
      throw new BadRequestException('Property request must be open');
    }

    // 4. Create the link
    const link = await this.prisma.client.propertyRequestLink.create({
      data: {
        propertyId: dto.propertyId,
        requestId: dto.requestId,
        agentId: agentProfile.id,
        agentNote: dto.agentNote,
        status: TriangleLinkStatus.PENDING,
      },
      include: {
        property: true,
        request: true,
      },
    });

    // 5. Notify the request owner
    await this.notificationService.createNotification(
      request.postedById,
      NotificationType.TRIANGLE_LINK_CREATED,
      {
        title: 'New Property Match',
        message: `An agent has matched a property to your request: ${request.title}`,
        actionUrl: `/triangle/${link.id}`,
      },
    );

    // 6. Increment property inquiry count
    await this.prisma.client.property.update({
      where: { id: dto.propertyId },
      data: {
        inquiryCount: {
          increment: 1,
        },
      },
    });

    return link;
  }

  async findAgentLinks(agentUserId: string, dto: ListLinksDto) {
    // Get agent profile
    const agentProfile = await this.prisma.client.agentProfile.findUnique({
      where: { userId: agentUserId },
    });

    if (!agentProfile) {
      throw new NotFoundException('Agent profile not found');
    }

    // Build where clause
    const where: any = {
      agentId: agentProfile.id,
    };

    if (dto.status) {
      where.status = dto.status;
    }

    if (dto.propertyId) {
      where.propertyId = dto.propertyId;
    }

    if (dto.requestId) {
      where.requestId = dto.requestId;
    }

    // Get total count
    const total = await this.prisma.client.propertyRequestLink.count({ where });

    // Get paginated data
    const links = await this.prisma.client.propertyRequestLink.findMany({
      where,
      skip: ((dto.page ?? 1) - 1) * (dto.limit ?? 10),
      take: dto.limit ?? 10,
      orderBy: { createdAt: 'desc' },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            slug: true,
            city: true,
            price: true,
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
        request: {
          select: {
            id: true,
            title: true,
            budgetMin: true,
            budgetMax: true,
          },
        },
      },
    });

    return {
      data: links,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  async findBuyerMatches(buyerUserId: string, dto: ListLinksDto) {
    // Find all requests by this buyer
    const requests = await this.prisma.client.propertyRequest.findMany({
      where: { postedById: buyerUserId },
      select: { id: true },
    });

    const requestIds = requests.map((r: { id: string }) => r.id);
    if (requestIds.length === 0) {
      return {
        data: [],
        meta: buildPaginationMeta(0, dto.page ?? 1, dto.limit ?? 10),
      };
    }

    // Build where clause
    const where: any = {
      requestId: { in: requestIds },
    };

    if (dto.status) {
      where.status = dto.status;
    }

    if (dto.propertyId) {
      where.propertyId = dto.propertyId;
    }

    if (dto.requestId) {
      where.requestId = dto.requestId;
    }

    // Get total count
    const total = await this.prisma.client.propertyRequestLink.count({ where });

    // Get paginated data
    const links = await this.prisma.client.propertyRequestLink.findMany({
      where,
      skip: ((dto.page ?? 1) - 1) * (dto.limit ?? 10),
      take: dto.limit ?? 10,
      orderBy: { createdAt: 'desc' },
      include: {
        property: true,
        agent: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        request: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return {
      data: links,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  async findOne(userId: string, linkId: string, role: Role) {
    const link = await this.prisma.client.propertyRequestLink.findUnique({
      where: { id: linkId },
      include: {
        property: true,
        request: {
          include: {
            postedBy: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        agent: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!link) {
      throw new NotFoundException('Triangle link not found');
    }

    // Check access permissions
    const hasAccess =
      role === Role.ADMIN ||
      link.agent.userId === userId ||
      link.request.postedById === userId;

    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this link');
    }

    return link;
  }

  async updateAgentNote(
    agentUserId: string,
    linkId: string,
    agentNote: string,
  ) {
    // Find agent profile
    const agentProfile = await this.prisma.client.agentProfile.findUnique({
      where: { userId: agentUserId },
    });

    if (!agentProfile) {
      throw new NotFoundException('Agent profile not found');
    }

    // Find link and check ownership
    const link = await this.prisma.client.propertyRequestLink.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      throw new NotFoundException('Triangle link not found');
    }

    if (link.agentId !== agentProfile.id) {
      throw new ForbiddenException('You do not own this link');
    }

    // Update agent note
    return this.prisma.client.propertyRequestLink.update({
      where: { id: linkId },
      data: { agentNote },
    });
  }

  async updateStatus(
    agentUserId: string,
    linkId: string,
    status: TriangleLinkStatus,
  ) {
    // Find agent profile
    const agentProfile = await this.prisma.client.agentProfile.findUnique({
      where: { userId: agentUserId },
    });

    if (!agentProfile) {
      throw new NotFoundException('Agent profile not found');
    }

    // Find link and check ownership
    const link = await this.prisma.client.propertyRequestLink.findUnique({
      where: { id: linkId },
      include: {
        request: true,
      },
    });

    if (!link) {
      throw new NotFoundException('Triangle link not found');
    }

    if (link.agentId !== agentProfile.id) {
      throw new ForbiddenException('You do not own this link');
    }

    // Update status with appropriate timestamps
    const updateData: any = { status };

    if (status === TriangleLinkStatus.BUYER_NOTIFIED) {
      updateData.notifiedAt = new Date();
    } else if (status === TriangleLinkStatus.CONNECTED) {
      updateData.connectedAt = new Date();
    } else if (status === TriangleLinkStatus.CLOSED) {
      updateData.closedAt = new Date();
    }

    const updatedLink = await this.prisma.client.propertyRequestLink.update({
      where: { id: linkId },
      data: updateData,
      include: {
        property: true,
        request: true,
      },
    });

    // Notify buyer about status change
    await this.notificationService.createNotification(
      link.request.postedById,
      NotificationType.TRIANGLE_LINK_UPDATED,
      {
        title: 'Triangle Match Status Update',
        message: `The status of your property match has been updated to: ${status}`,
        actionUrl: `/triangle/${link.id}`,
      },
    );

    return updatedLink;
  }

  async buyerRespond(
    buyerUserId: string,
    linkId: string,
    dto: BuyerResponseDto,
  ) {
    // Find link
    const link = await this.prisma.client.propertyRequestLink.findUnique({
      where: { id: linkId },
      include: {
        request: true,
        agent: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!link) {
      throw new NotFoundException('Triangle link not found');
    }

    // Check if buyer owns the request
    if (link.request.postedById !== buyerUserId) {
      throw new ForbiddenException('You do not own this request');
    }

    // Update based on interest
    const updateData: any = {
      buyerResponse: dto.buyerResponse,
    };

    if (dto.interested) {
      updateData.status = TriangleLinkStatus.BUYER_INTERESTED;
      updateData.respondedAt = new Date();
    } else {
      updateData.status = TriangleLinkStatus.REJECTED;
      updateData.closedAt = new Date();
    }

    const updatedLink = await this.prisma.client.propertyRequestLink.update({
      where: { id: linkId },
      data: updateData,
      include: {
        property: true,
        request: true,
      },
    });

    // Notify agent about buyer response
    const notificationMessage = dto.interested
      ? `Good news! The buyer is interested in your property match.`
      : `The buyer has declined the property match.`;

    await this.notificationService.createNotification(
      link.agent.userId,
      NotificationType.TRIANGLE_LINK_UPDATED,
      {
        title: 'Buyer Response Received',
        message: notificationMessage,
        actionUrl: `/triangle/${link.id}`,
      },
    );

    return updatedLink;
  }
}
