import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckDto {
  @ApiProperty({
    example: 'ok',
    description: 'Overall health status of the service',
    enum: ['ok', 'error', 'shutting_down'],
  })
  status!: 'ok' | 'error' | 'shutting_down';

  @ApiProperty({
    example: {
      database: {
        status: 'up',
      },
    },
    description: 'Component health details',
    required: false,
  })
  info?: Record<string, unknown>;

  @ApiProperty({
    example: {
      redis: {
        status: 'down',
        message: 'Connection timed out',
      },
    },
    description: 'Component health errors',
    required: false,
  })
  error?: Record<string, unknown>;

  @ApiProperty({
    example: {
      database: {
        status: 'up',
      },
      redis: {
        status: 'down',
        message: 'Connection timed out',
      },
    },
    description: 'All component health details (ok + error)',
  })
  details!: Record<string, unknown>;
}
