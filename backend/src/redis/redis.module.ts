import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '@redis/redis.constants';
import { RedisClientFactory } from '@redis/redis-client.factory';
import { RedisHealthIndicator } from '@redis/redis.health';

/**
 * Global Redis module.
 *
 * Provides a shared ioredis client (`REDIS_CLIENT`) that any service
 * can inject. The client is configured with automatic reconnection
 * and a key prefix for namespace isolation.
 *
 * Usage in any service:
 * ```ts
 * import { Inject } from '@nestjs/common';
 * import Redis from 'ioredis';
 * import { REDIS_CLIENT } from '@redis';
 *
 * @Inject(REDIS_CLIENT) private readonly redis: Redis
 * ```
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    RedisClientFactory,
    {
      provide: REDIS_CLIENT,
      inject: [RedisClientFactory],
      useFactory: (factory: RedisClientFactory): Redis => factory.create(),
    },
    RedisHealthIndicator,
  ],
  exports: [REDIS_CLIENT, RedisHealthIndicator],
})
export class RedisModule implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) { }

  async onModuleDestroy(): Promise<void> {
    await this.redis.quit();
  }
}
