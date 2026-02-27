import { Module } from '@nestjs/common';
import { ServiceProviderProfileController } from './service-provider-profile.controller';
import { ServiceProviderProfileService } from './service-provider-profile.service';
import { NotificationModule } from '../notification/notification.module';
import { AdminLogModule } from '../admin-log/admin-log.module';

@Module({
  imports: [NotificationModule, AdminLogModule],
  controllers: [ServiceProviderProfileController],
  providers: [ServiceProviderProfileService],
  exports: [ServiceProviderProfileService],
})
export class ServiceProviderProfileModule {}
