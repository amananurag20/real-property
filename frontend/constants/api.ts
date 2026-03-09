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

export const PAYMENT_ENDPOINTS = {
    CONFIG: {
        method: 'GET' as HttpMethod,
        url: '/payment/config',
    },
    CREATE_ORDER: {
        method: 'POST' as HttpMethod,
        url: '/payment/create-order',
    },
    VERIFY: {
        method: 'POST' as HttpMethod,
        url: '/payment/verify',
    },
    LIST_ALL: {
        method: 'GET' as HttpMethod,
        url: '/payment',
    },
    LIST_MY: {
        method: 'GET' as HttpMethod,
        url: '/payment/me',
    },
    SYNC_STATUS: (id: string) => ({
        method: 'POST' as HttpMethod,
        url: `/payment/${id}/sync`,
    }),
};
