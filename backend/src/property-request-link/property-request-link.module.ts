import { Module } from '@nestjs/common';
import { PropertyRequestLinkController } from './property-request-link.controller';
import { PropertyRequestLinkService } from './property-request-link.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [PropertyRequestLinkController],
  providers: [PropertyRequestLinkService],
  exports: [PropertyRequestLinkService],
})
export class PropertyRequestLinkModule {}
