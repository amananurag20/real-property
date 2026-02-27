import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { ListNotificationsDto } from './dto/list-notifications.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('me')
  @ApiOperation({ summary: 'List own notifications' })
  findMyNotifications(
    @CurrentUser() user: { id: string },
    @Query() dto: ListNotificationsDto,
  ) {
    return this.notificationService.findMyNotifications(user.id, dto);
  }

  @Get('me/unread-count')
  @ApiOperation({ summary: 'Get unread notification count' })
  getUnreadCount(@CurrentUser() user: { id: string }) {
    return this.notificationService.getUnreadCount(user.id);
  }

  @Patch(':id/read')
  @ResponseMessage('Notification marked as read')
  @ApiOperation({ summary: 'Mark notification as read' })
  markAsRead(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ) {
    return this.notificationService.markAsRead(user.id, id);
  }

  @Patch('mark-all-read')
  @ResponseMessage('All notifications marked as read')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllAsRead(@CurrentUser() user: { id: string }) {
    return this.notificationService.markAllAsRead(user.id);
  }

  @Delete(':id')
  @ResponseMessage('Notification deleted')
  @ApiOperation({ summary: 'Delete notification' })
  deleteNotification(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ) {
    return this.notificationService.deleteNotification(user.id, id);
  }
}
