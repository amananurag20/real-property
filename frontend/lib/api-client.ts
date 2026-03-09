import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Track if a refresh is already in progress to avoid duplicate calls
let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (token) {
            resolve(token);
        } else {
            reject(error);
        }
    });
    failedQueue = [];
};

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors and auto-refreshing tokens
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Only attempt refresh on 401 errors, not on refresh endpoint itself
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            typeof window !== 'undefined' &&
            !originalRequest.url?.includes('/auth/refresh')
        ) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                // No refresh token — force logout
                clearAuthAndRedirect();
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Another refresh is in progress — queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        },
                        reject,
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axios.post(
                    `${api.defaults.baseURL}/auth/refresh`,
                    { refreshToken },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const newAccessToken = res.data?.data?.accessToken;
                const newRefreshToken = res.data?.data?.refreshToken;

                if (newAccessToken) {
                    localStorage.setItem('access_token', newAccessToken);
                    document.cookie = `token=${newAccessToken}; path=/; Max-Age=86400; SameSite=Lax`;

                    if (newRefreshToken) {
                        localStorage.setItem('refresh_token', newRefreshToken);
                    }

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    processQueue(null, newAccessToken);
                    return api(originalRequest);
                }

                // If no token in response, force logout
                processQueue(error, null);
                clearAuthAndRedirect();
                return Promise.reject(error);
            } catch (refreshError) {
                processQueue(refreshError, null);
                clearAuthAndRedirect();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

function clearAuthAndRedirect() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/login';
}

export default api;
