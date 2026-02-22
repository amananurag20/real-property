import { Injectable } from '@nestjs/common';
import { HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { RedisHealthIndicator } from '../redis';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly redisHealth: RedisHealthIndicator,
  ) {}

  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      // Redis connectivity
      () => this.redisHealth.isHealthy('redis'),

      // TODO: Add remaining dependency health indicators:
      // - Postgres:    () => this.db.pingCheck('database')
      // - Azure Blob:  () => this.http.pingCheck('azure-blob', '<blob-url>')
    ]);
  }
}
