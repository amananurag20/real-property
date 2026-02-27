import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  host: string;
  port: number;
  password: string | undefined;
  db: number;
  keyPrefix: string;
  maxRetriesPerRequest: number | null;
  retryDelayMs: number;
  maxRetryDelayMs: number;
}

/**
 * Redis connection configuration.
 *
 * Centralised so that both the standalone ioredis client AND
 * BullMQ share the same connection coordinates.
 * Swap `REDIS_HOST` / `REDIS_PORT` / `REDIS_PASSWORD` to point
 * at Docker, Azure Cache for Redis, or any other provider.
 */
export const redisConfig = registerAs(
  'redis',
  (): RedisConfig => ({
    host: process.env['REDIS_HOST'] ?? 'localhost',
    port: parseInt(process.env['REDIS_PORT'] ?? '6379', 10),
    password: process.env['REDIS_PASSWORD'] || undefined,
    db: parseInt(process.env['REDIS_DB'] ?? '0', 10),
    keyPrefix: process.env['REDIS_KEY_PREFIX'] ?? 'real-property:',
    maxRetriesPerRequest: null, // Required by BullMQ (must be null)
    retryDelayMs: 500,
    maxRetryDelayMs: 5000,
  }),
);
