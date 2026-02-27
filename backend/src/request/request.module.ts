import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { PrismaModule } from '../prisma';
import { NotificationModule } from '../notification/notification.module';
import { AdminLogModule } from '../admin-log/admin-log.module';

@Module({
  imports: [PrismaModule, NotificationModule, AdminLogModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
