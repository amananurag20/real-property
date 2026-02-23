import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@health/health.controller';
import { HealthService } from '@health/health.service';
import { PrismaModule } from '@prisma';

@Module({
  imports: [TerminusModule, PrismaModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule { }
