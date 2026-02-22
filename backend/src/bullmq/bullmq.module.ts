import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { RedisConfig } from '../config';
import { QUEUE_NAMES } from '../config';

/**
 * BullMQ module.
 *
 * Encapsulates the BullMQ root connection (sharing the same Redis
 * config as the standalone ioredis client) and registers all
 * named queues in one place.
 */
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const cfg = configService.get<RedisConfig>('redis');
        if (!cfg) {
          throw new Error('Redis configuration is missing');
        }
        return {
          connection: {
            host: cfg.host,
            port: cfg.port,
            password: cfg.password,
            db: cfg.db,
            maxRetriesPerRequest: null, // Required by BullMQ
          },
          defaultJobOptions: {
            removeOnComplete: { count: 1000 },
            removeOnFail: { count: 5000 },
            attempts: 3,
            backoff: { type: 'exponential', delay: 5000 },
          },
        };
      },
    }),

    // Register named queues
    BullModule.registerQueue(
      { name: QUEUE_NAMES.DELTA_SYNC },
      { name: QUEUE_NAMES.OUTBOUND_CHANGES },
    ),
  ],
  exports: [BullModule],
})
export class BullMQModule {}
