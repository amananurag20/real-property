import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { AdminAction } from '../../generated/prisma/enums';
import { ListAdminLogsDto } from './dto/list-admin-logs.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';

interface CreateLogData {
  description?: string;
  targetType: string;
  targetId: string;
  previousState?: unknown;
  newState?: unknown;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AdminLogService {
  constructor(private readonly prisma: PrismaService) {}

  /** Create an audit log entry (called by other services) */
  async createLog(adminId: string, action: AdminAction, data: CreateLogData) {
    return this.prisma.client.adminLog.create({
      data: {
        adminId,
        action,
        description: data.description,
        targetType: data.targetType,
        targetId: data.targetId,
        previousState: data.previousState ?? undefined,
        newState: data.newState ?? undefined,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }

  /** List all admin logs (paginated, filterable) */
  async findAll(dto: ListAdminLogsDto) {
    const { skip, take, orderBy } = dto.toPrismaArgs();

    const where: Record<string, unknown> = {};
    if (dto.action) where.action = dto.action;
    if (dto.targetType) where.targetType = dto.targetType;
    if (dto.targetId) where.targetId = dto.targetId;
    if (dto.adminId) where.adminId = dto.adminId;
    if (dto.startDate || dto.endDate) {
      where.createdAt = {};
      if (dto.startDate) (where.createdAt as Record<string, unknown>).gte = new Date(dto.startDate);
      if (dto.endDate) (where.createdAt as Record<string, unknown>).lte = new Date(dto.endDate);
    }

    const [items, total] = await Promise.all([
      this.prisma.client.adminLog.findMany({ where, orderBy, skip, take }),
      this.prisma.client.adminLog.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  /** Get a single log entry */
  async findOne(id: string) {
    const log = await this.prisma.client.adminLog.findUnique({
      where: { id },
    });
    if (!log) throw new Error('Admin log not found.');
    return log;
  }
}
