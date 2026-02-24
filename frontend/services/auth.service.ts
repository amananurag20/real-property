import api from '@/lib/api-client';
import { AUTH_ENDPOINTS } from '@/constants/api';
import { Role } from '@/constants/roles';

export interface SendOtpPayload {
    phone: string;
}

export interface VerifyOtpPayload {
    phone: string;
    otp: string;
}

export interface RegisterPayload {
    phone: string;
    name: string;
    email: string;
    role: Role;
}

class AuthServiceApi {
    async sendOtp(data: SendOtpPayload) {
        const { method, url } = AUTH_ENDPOINTS.SEND_OTP;
        return api({ method, url, data });
    }

    async verifyOtp(data: VerifyOtpPayload) {
        const { method, url } = AUTH_ENDPOINTS.VERIFY_OTP;
        return api({ method, url, data });
    }

    async register(data: RegisterPayload) {
        const { method, url } = AUTH_ENDPOINTS.REGISTER;
        return api({ method, url, data });
    }
}

export const authServiceApi = new AuthServiceApi();
