import { AxiosError } from 'axios';

// Interfaces matching backend responses
export interface ApiResponse<T = unknown> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    timestamp: string;
}

export interface ApiErrorResponse {
    success: false;
    statusCode: number;
    message: string | string[];
    error: string;
    timestamp: string;
    path: string;
}

export interface PaginatedApiResponse<T = unknown> extends ApiResponse<T[]> {
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

/**
 * Extracts the inner 'data' payload from a successful standardized API response.
 * @param response The raw Axios response containing the ApiResponse
 * @returns The inner data payload
 */
export function extractData<T>(response: { data: ApiResponse<T> }): T {
    // Return early if there is no data inside
    if (!response.data || !response.data.data) {
        return undefined as any;
    }
    return response.data.data;
}

/**
 * Extracts a unified error message string from an Axios error or standard Error.
 * Handles NestJS validation arrays (string[]) by joining them, and standard strings.
 * @param error The caught error
 * @param defaultMessage Fallback message if the error structure is unreadable
 * @returns Formatted error string to show to users
 */
export function extractError(error: unknown, defaultMessage = 'An unexpected error occurred. Please try again.'): string {
    if (!error) return defaultMessage;

    if (error instanceof AxiosError && error.response && error.response.data) {
        const errorData = error.response.data as ApiErrorResponse;

        // Handle array of validation messages
        if (Array.isArray(errorData.message)) {
            return errorData.message.join('. ');
        }

        // Handle single string message
        if (typeof errorData.message === 'string') {
            return errorData.message;
        }
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return defaultMessage;
}
