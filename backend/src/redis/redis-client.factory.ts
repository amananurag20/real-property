import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisConfig } from '../config';

/**
 * Factory responsible for creating and configuring the ioredis client.
 *
 * Extracted from the module-level `useFactory` so that retry strategy,
 * event wiring, and config validation can be unit-tested independently.
 */
@Injectable()
export class RedisClientFactory {
  private readonly logger = new Logger(RedisClientFactory.name);

  constructor(private readonly configService: ConfigService) {}

  create(): Redis {
    const cfg = this.configService.get<RedisConfig>('redis');

    if (!cfg) {
      throw new Error('Redis configuration is missing');
    }

    const client = new Redis({
      host: cfg.host,
      port: cfg.port,
      password: cfg.password,
      db: cfg.db,
      keyPrefix: cfg.keyPrefix,
      maxRetriesPerRequest: cfg.maxRetriesPerRequest,
      connectTimeout: 5000, // Fail fast instead of ioredis 10s default
      retryStrategy: (times: number): number => {
        const delay = Math.min(times * cfg.retryDelayMs, cfg.maxRetryDelayMs);
        this.logger.warn(
          `Redis reconnecting — attempt ${times}, next retry in ${delay}ms`,
        );
        return delay;
      },
      // Don't throw on initial connect failure (let it retry in background)
      lazyConnect: false,
    });

    client.on('connect', () => {
      this.logger.log(`Connected to Redis at ${cfg.host}:${cfg.port}`);
    });

    client.on('ready', () => {
      this.logger.log('Redis client ready');
    });

    client.on('error', (err: Error) => {
      this.logger.error(`Redis error: ${err.message}`);
    });

    client.on('close', () => {
      this.logger.warn('Redis connection closed');
    });

    return client;
  }
}
