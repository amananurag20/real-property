import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { AppModule } from '@app';
import { HttpExceptionFilter, TransformInterceptor } from '@common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  const logger = app.get(Logger);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 3000);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // ── Security ──────────────────────────────────────────────
  app.use(helmet());

  const corsOrigins = configService.get<string>('CORS_ORIGINS', '*');

  app.enableCors({
    origin:
      corsOrigins === '*' ? true : corsOrigins.split(',').map((o) => o.trim()),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ── Socket.IO adapter ─────────────────────────────────────
  // Must be applied before any module initialises the gateway.
  app.useWebSocketAdapter(new IoAdapter(app));

  // ── Global prefix & versioning ────────────────────────────
  // All routes live under /api/v1/…
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // ── Global pipes ──────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not in the DTO
      forbidNonWhitelisted: true, // throw if unknown properties are sent
      transform: true, // auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // convert query-string types automatically
      },
    }),
  );

  // ── Global filters ────────────────────────────────────────
  app.useGlobalFilters(new HttpExceptionFilter());

  // ── Global interceptors ───────────────────────────────────
  // Wraps every success response in: { success, statusCode, message, data, timestamp }
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));

  // ── Swagger / OpenAPI ─────────────────────────────────────
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Real Property API')
      .setDescription('Real Property Service API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
    logger.log(`Swagger docs: http://localhost:${port}/api-docs`);
  }

  // ── Start ─────────────────────────────────────────────────
  await app.listen(port);
  logger.log(`Server running on http://localhost:${port}`);
  logger.log(`Environment: ${nodeEnv}`);
}
void bootstrap();
