import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse, nowISO } from '@common';

/**
 * Global HTTP exception filter.
 *
 * Catches every exception (both HttpException and unexpected errors)
 * and returns a consistent JSON envelope:
 *
 * ```json
 * {
 *   "success": false,
 *   "statusCode": 400,
 *   "message": "Validation failed",
 *   "error": "Bad Request",
 *   "timestamp": "2026-02-23T12:00:00.000Z",
 *   "path": "/api/v1/users"
 * }
 * ```
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | string[];
    let error: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = HttpStatus[status] ?? 'Error';
      } else {
        const res = exceptionResponse as Record<string, unknown>;
        message = (res.message as string | string[]) ?? exception.message;
        error = (res.error as string) ?? HttpStatus[status] ?? 'Error';
      }
    } else {
      // Unexpected / unhandled errors → 500
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      error = 'Internal Server Error';

      // Log the full stack for debugging — never leak to client
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const body: ApiErrorResponse = {
      success: false,
      statusCode: status,
      message,
      error,
      timestamp: nowISO(),
      path: request.url,
    };

    response.status(status).json(body);
  }
}
