import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { LoggingModule } from './logging/logging.module';
import { PrismaModule } from './prisma';
import { UploadModule } from './upload/upload.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotificationModule } from './notification/notification.module';
import { AdminLogModule } from './admin-log/admin-log.module';
import { AgentProfileModule } from './agent-profile/agent-profile.module';
import { ServiceProviderProfileModule } from './service-provider-profile/service-provider-profile.module';
import { PropertyModule } from './property/property.module';
import { RequestModule } from './request/request.module';
import { PropertyRequestLinkModule } from './property-request-link/property-request-link.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';
import { ContactInquiryModule } from './contact-inquiry/contact-inquiry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_TIMEZONE: Joi.string().default('Asia/Kolkata'),

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
    LoggingModule,
    HealthModule,
    UploadModule,
    SocketModule,
    AuthModule,
    UsersModule,
    NotificationModule,
    AdminLogModule,
    AgentProfileModule,
    ServiceProviderProfileModule,
    PropertyModule,
    RequestModule,
    PropertyRequestLinkModule,
    ReviewModule,
    PaymentModule,
    ContactInquiryModule,
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
