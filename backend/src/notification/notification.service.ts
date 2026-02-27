import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import { SocketService } from '../socket';
import { NotificationType } from '../../generated/prisma/enums';
import { ListNotificationsDto } from './dto/list-notifications.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';

interface CreateNotificationData {
  title: string;
  message: string;
  referenceType?: string;
  referenceId?: string;
  actionUrl?: string;
}

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketService: SocketService,
  ) {}

  /** Create a notification and emit via WebSocket */
  async createNotification(
    userId: string,
    type: NotificationType,
    data: CreateNotificationData,
  ) {
    const notification = await this.prisma.client.notification.create({
      data: {
        userId,
        type,
        title: data.title,
        message: data.message,
        referenceType: data.referenceType,
        referenceId: data.referenceId,
        actionUrl: data.actionUrl,
      },
    });

    // Real-time delivery via Socket.IO
    this.socketService.emitToRoom(`user:${userId}`, 'notification', notification);

    return notification;
  }

  /** List own notifications (paginated) */
  async findMyNotifications(userId: string, dto: ListNotificationsDto) {
    const { skip, take, orderBy } = dto.toPrismaArgs();

    const where: Record<string, unknown> = { userId };
    if (dto.type) where.type = dto.type;
    if (dto.isRead !== undefined) where.isRead = dto.isRead;

    const [items, total] = await Promise.all([
      this.prisma.client.notification.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.prisma.client.notification.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, dto.page ?? 1, dto.limit ?? 10),
    };
  }

  /** Count unread notifications */
  async getUnreadCount(userId: string) {
    const count = await this.prisma.client.notification.count({
      where: { userId, isRead: false },
    });
    return { unreadCount: count };
  }

  /** Mark a single notification as read */
  async markAsRead(userId: string, notificationId: string) {
    const notification = await this.prisma.client.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) throw new NotFoundException('Notification not found.');
    if (notification.userId !== userId)
      throw new ForbiddenException('Access denied.');

    return this.prisma.client.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
  }

  /** Mark all notifications as read */
  async markAllAsRead(userId: string) {
    await this.prisma.client.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
    return { message: 'All notifications marked as read.' };
  }

  /** Delete a notification */
  async deleteNotification(userId: string, notificationId: string) {
    const notification = await this.prisma.client.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) throw new NotFoundException('Notification not found.');
    if (notification.userId !== userId)
      throw new ForbiddenException('Access denied.');

    await this.prisma.client.notification.delete({
      where: { id: notificationId },
    });
    return { message: 'Notification deleted.' };
  }
}
