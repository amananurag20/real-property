import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';
import { nowISO } from '../utils/timezone.util';

/**
 * Global interceptor that wraps every controller response in a standard
 * success envelope:
 *
 * ```json
 * {
 *   "success": true,
 *   "statusCode": 200,
 *   "message": "OK",
 *   "data": <controller return value>,
 *   "timestamp": "2026-02-23T..."
 * }
 * ```
 *
 * Override the default `"OK"` message on any route with the
 * `@ResponseMessage('...')` decorator.
 */
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, ApiResponse<T>> {
    constructor(private readonly reflector: Reflector) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ApiResponse<T>> {
        const message =
            this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
            'OK';

        const httpResponse = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            map((data: T): ApiResponse<T> => {
                return {
                    success: true,
                    statusCode: httpResponse.statusCode,
                    message,
                    data,
                    timestamp: nowISO(),
                };
            }),
        );
    }
}
