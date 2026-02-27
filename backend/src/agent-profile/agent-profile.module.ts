import { Module } from '@nestjs/common';
import { AgentProfileController } from './agent-profile.controller';
import { AgentProfileService } from './agent-profile.service';
import { NotificationModule } from '../notification/notification.module';
import { AdminLogModule } from '../admin-log/admin-log.module';

@Module({
  imports: [NotificationModule, AdminLogModule],
  controllers: [AgentProfileController],
  providers: [AgentProfileService],
  exports: [AgentProfileService],
})
export class AgentProfileModule {}
