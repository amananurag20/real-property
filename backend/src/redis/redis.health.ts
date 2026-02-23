import { Inject, Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '@redis/redis.constants';

/**
 * Terminus health indicator for the Redis connection.
 *
 * Used by the HealthController to include Redis status
 * in the `/health` endpoint response.
 */
@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const pong = await this.redis.ping();
      const isUp = pong === 'PONG';

      const result = this.getStatus(key, isUp);

      if (isUp) {
        return result;
      }

      throw new HealthCheckError('Redis check failed', result);
    } catch (error) {
      if (error instanceof HealthCheckError) throw error;
      const result = this.getStatus(key, false, {
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new HealthCheckError('Redis check failed', result);
    }
  }
}
