import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheckDto } from './dto/health.dto';
import { HealthService } from './health.service';

/**
 * Health check controller.
 *
 * The `/health` route is intentionally kept unversioned (i.e. not under `/api/v1`)
 * so that load balancer and K8s liveness/readiness probes can hit a stable,
 * version-independent endpoint.
 */
@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Application health check' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    type: HealthCheckDto,
  })
  @ApiResponse({
    status: 503,
    description: 'Service is unhealthy',
  })
  async check(): Promise<HealthCheckResult> {
    return this.healthService.check();
  }
}
