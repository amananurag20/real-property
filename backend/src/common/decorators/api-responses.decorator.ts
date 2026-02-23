import { applyDecorators, Type } from '@nestjs/common';
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiUnprocessableEntityResponse,
    ApiInternalServerErrorResponse,
    getSchemaPath,
} from '@nestjs/swagger';

/**
 * Swagger decorator that documents a successful `200 OK` response
 * using the standard API envelope with a typed `data` field.
 *
 * @example
 * \@ApiSuccessResponse(UserDto)
 * \@Get(':id')
 * findOne() { ... }
 */
export function ApiSuccessResponse<T>(
    dto: Type<T>,
    description = 'Request succeeded',
) {
    return applyDecorators(
        ApiExtraModels(dto),
        ApiOkResponse({
            description,
            schema: {
                allOf: [
                    {
                        properties: {
                            success: { type: 'boolean', example: true },
                            statusCode: { type: 'number', example: 200 },
                            message: { type: 'string', example: 'OK' },
                            timestamp: {
                                type: 'string',
                                example: '2026-02-23T14:00:00.000Z',
                            },
                            data: { $ref: getSchemaPath(dto) },
                        },
                    },
                ],
            },
        }),
    );
}

/**
 * Swagger decorator that documents a `201 Created` response.
 */
export function ApiCreatedSuccessResponse<T>(
    dto: Type<T>,
    description = 'Resource created',
) {
    return applyDecorators(
        ApiExtraModels(dto),
        ApiCreatedResponse({
            description,
            schema: {
                allOf: [
                    {
                        properties: {
                            success: { type: 'boolean', example: true },
                            statusCode: { type: 'number', example: 201 },
                            message: { type: 'string', example: 'Created' },
                            timestamp: {
                                type: 'string',
                                example: '2026-02-23T14:00:00.000Z',
                            },
                            data: { $ref: getSchemaPath(dto) },
                        },
                    },
                ],
            },
        }),
    );
}

/**
 * Adds common error response schemas (401, 403, 404, 422, 500)
 * to the Swagger docs for a route.
 */
export function ApiErrorResponses() {
    return applyDecorators(
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiForbiddenResponse({ description: 'Forbidden' }),
        ApiNotFoundResponse({ description: 'Not Found' }),
        ApiUnprocessableEntityResponse({ description: 'Validation Error' }),
        ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
    );
}
