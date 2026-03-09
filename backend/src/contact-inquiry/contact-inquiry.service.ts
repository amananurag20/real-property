import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { ListInquiriesDto } from './dto/list-inquiries.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';

@Injectable()
export class ContactInquiryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInquiryDto) {
    const inquiry = await this.prisma.client.contactInquiry.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        subject: dto.subject,
        message: dto.message,
        propertyId: dto.propertyId,
        agentId: dto.agentId,
        isResolved: false,
      },
    });

    return inquiry;
  }

  async findAll(dto: ListInquiriesDto) {
    const { page = 1, limit = 10, isResolved, propertyId, agentId } = dto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (isResolved !== undefined) where.isResolved = isResolved;
    if (propertyId) where.propertyId = propertyId;
    if (agentId) where.agentId = agentId;

    const [data, total] = await Promise.all([
      this.prisma.client.contactInquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.contactInquiry.count({ where }),
    ]);

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  async findOne(id: string) {
    const inquiry = await this.prisma.client.contactInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      throw new NotFoundException('Contact inquiry not found');
    }

    return inquiry;
  }

  async markResolved(id: string, adminId: string, notes?: string) {
    const inquiry = await this.prisma.client.contactInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      throw new NotFoundException('Contact inquiry not found');
    }

    const updated = await this.prisma.client.contactInquiry.update({
      where: { id },
      data: {
        isResolved: true,
        resolvedAt: new Date(),
        resolvedBy: adminId,
        notes,
      },
    });

    return updated;
  }
}
