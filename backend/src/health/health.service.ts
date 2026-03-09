import { Injectable } from '@nestjs/common';
import { HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { PrismaService } from '../prisma';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prisma: PrismaService,
  ) { }

  async check(): Promise<HealthCheckResult> {
    return this.health.check([      // PostgreSQL connectivity via Prisma
      async () => {
        await this.prisma.client.$queryRaw`SELECT 1`;
        return { database: { status: 'up' as const } };
      },
    ]);
  }
}
