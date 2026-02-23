import { Injectable } from '@nestjs/common';
import { HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { RedisHealthIndicator } from '@redis';
import { PrismaService } from '@prisma';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly redisHealth: RedisHealthIndicator,
    private readonly prisma: PrismaService,
  ) { }

  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      // Redis connectivity
      () => this.redisHealth.isHealthy('redis'),

      // PostgreSQL connectivity via Prisma
      async () => {
        await this.prisma.client.$queryRaw`SELECT 1`;
        return { database: { status: 'up' as const } };
      },
    ]);
  }
}
