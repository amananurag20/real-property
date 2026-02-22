import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

/**
 * Logging module.
 *
 * Configures Pino structured logging with environment-aware defaults:
 * - Production: JSON output at `info` level
 * - Development: Pretty-printed, colorized output at `debug` level
 *
 * Health-check requests are excluded from auto-logging to reduce noise.
 */
@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';
        return {
          pinoHttp: {
            level: isProduction ? 'info' : 'debug',
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: { colorize: true, singleLine: true },
                },
            // Don't log health-check noise
            autoLogging: {
              ignore: (req: { url?: string }): boolean =>
                req.url === '/api/v1/health',
            },
          },
        };
      },
    }),
  ],
})
export class LoggingModule {}
