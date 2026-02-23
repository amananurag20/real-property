import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as Joi from 'joi';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { HealthModule } from '@health/health.module';
import { RedisModule } from '@redis';
import { BullMQModule } from '@bullmq/bullmq.module';
import { LoggingModule } from '@logging/logging.module';
import { PrismaModule } from '@prisma';
import { redisConfig } from '@config';
import { UploadModule } from '@upload/upload.module';
import { SocketModule } from '@socket/socket.module';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_TIMEZONE: Joi.string().default('Asia/Kolkata'),

        // Redis
        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
        REDIS_PASSWORD: Joi.string().optional().allow('').default(''),
        REDIS_DB: Joi.number().default(0),
        REDIS_KEY_PREFIX: Joi.string().default('max-shipping:'),

        // Database (Prisma)
        DATABASE_URL: Joi.string().required(),

        // File uploads
        UPLOAD_DEST: Joi.string().default('uploads'),
        MAX_FILE_SIZE_MB: Joi.number().default(10),
        MAX_FILES: Joi.number().default(10),

        // Auth / JWT
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
      }),
    }),

    // Rate limiting — 60 requests per 60-second window per IP
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 60,
      },
    ]),

    PrismaModule,
    RedisModule,
    BullMQModule,
    LoggingModule,
    HealthModule,
    UploadModule,
    SocketModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
