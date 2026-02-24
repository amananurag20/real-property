// Define your API methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiEndpoint {
    method: HttpMethod;
    url: string;
}

// Group API endpoints logically
export const AUTH_ENDPOINTS = {
    REGISTER: {
        method: 'POST' as HttpMethod,
        url: '/auth/register',
    },
    SEND_OTP: {
        method: 'POST' as HttpMethod,
        url: '/auth/send-otp',
    },
    VERIFY_OTP: {
        method: 'POST' as HttpMethod,
        url: '/auth/verify-otp',
    },
    REFRESH_TOKEN: {
        method: 'POST' as HttpMethod,
        url: '/auth/refresh-token',
    },
};

export const USER_ENDPOINTS = {
    FIND_ME: {
        method: 'GET' as HttpMethod,
        url: '/users/me',
    },
};
