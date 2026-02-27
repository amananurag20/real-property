import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { NotificationModule } from '../notification/notification.module';
import { AdminLogModule } from '../admin-log/admin-log.module';

@Module({
  imports: [NotificationModule, AdminLogModule],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
