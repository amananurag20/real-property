import api from '@/lib/api-client';
import { PAYMENT_ENDPOINTS } from '@/constants/api';

export interface CreateOrderPayload {
    amount: number;
    paymentType: string;
    description?: string;
    referenceType?: string;
    referenceId?: string;
    metadata?: Record<string, unknown>;
}

export interface VerifyPaymentPayload {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}

export interface PaymentListParams {
    page?: number;
    limit?: number;
    status?: string;
    paymentType?: string;
}

class PaymentServiceApi {
    async getConfig() {
        const { method, url } = PAYMENT_ENDPOINTS.CONFIG;
        return api({ method, url });
    }

    async createOrder(data: CreateOrderPayload) {
        const { method, url } = PAYMENT_ENDPOINTS.CREATE_ORDER;
        return api({ method, url, data });
    }

    async verifyPayment(data: VerifyPaymentPayload) {
        const { method, url } = PAYMENT_ENDPOINTS.VERIFY;
        return api({ method, url, data });
    }

    async listAll(params?: PaymentListParams) {
        const { method, url } = PAYMENT_ENDPOINTS.LIST_ALL;
        return api({ method, url, params });
    }

    async listMy(params?: PaymentListParams) {
        const { method, url } = PAYMENT_ENDPOINTS.LIST_MY;
        return api({ method, url, params });
    }

    async syncStatus(id: string) {
        const { method, url } = PAYMENT_ENDPOINTS.SYNC_STATUS(id);
        return api({ method, url });
    }
}

export const paymentServiceApi = new PaymentServiceApi();
