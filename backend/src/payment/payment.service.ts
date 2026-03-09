import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { ListPaymentsDto } from './dto/list-payments.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';
import { PaymentStatus } from '../../generated/prisma/enums';
import { Role } from '../../generated/prisma/enums';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private razorpay: InstanceType<typeof Razorpay>;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get<string>('RAZORPAY_KEY_ID')!,
      key_secret: this.configService.get<string>('RAZORPAY_KEY_SECRET')!,
    });
  }

  /** Returns the Razorpay publishable key for the frontend */
  getConfig() {
    return {
      keyId: this.configService.get<string>('RAZORPAY_KEY_ID'),
    };
  }

  /** Create a Razorpay order and persist the payment record */
  async createOrder(userId: string, dto: CreatePaymentDto) {
    // Amount in paise (Razorpay expects smallest currency unit)
    const amountInPaise = Math.round(dto.amount * 100);

    let razorpayOrder: any;
    try {
      razorpayOrder = await this.razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          userId,
          paymentType: dto.paymentType,
          description: dto.description || '',
        },
      });
    } catch (err: any) {
      this.logger.error(
        `Razorpay order creation failed: ${err?.error?.description || err?.message || JSON.stringify(err)}`,
      );
      throw new BadRequestException(
        `Razorpay error: ${err?.error?.description || err?.message || 'Failed to create order'}`,
      );
    }

    const payment = await this.prisma.client.payment.create({
      data: {
        userId,
        amount: dto.amount,
        currency: 'INR',
        status: PaymentStatus.INITIATED,
        paymentType: dto.paymentType,
        description: dto.description,
        referenceType: dto.referenceType,
        referenceId: dto.referenceId,
        metadata: dto.metadata as any,
        razorpayOrderId: razorpayOrder.id,
      },
    });

    return {
      paymentId: payment.id,
      razorpayOrderId: razorpayOrder.id,
      amount: payment.amount,
      currency: payment.currency,
    };
  }

  /** Verify payment signature after Razorpay checkout */
  async verifyPayment(userId: string, dto: VerifyPaymentDto) {
    const payment = await this.prisma.client.payment.findFirst({
      where: {
        razorpayOrderId: dto.razorpayOrderId,
        userId,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.status === PaymentStatus.SUCCESS) {
      return payment;
    }

    // Verify signature
    const secret = this.configService.get<string>('RAZORPAY_KEY_SECRET')!;
    const body = dto.razorpayOrderId + '|' + dto.razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== dto.razorpaySignature) {
      await this.prisma.client.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.FAILED,
          failureReason: 'Signature verification failed',
        },
      });
      throw new BadRequestException(
        'Payment verification failed: invalid signature',
      );
    }

    const updatedPayment = await this.prisma.client.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.SUCCESS,
        razorpayPaymentId: dto.razorpayPaymentId,
        razorpaySignature: dto.razorpaySignature,
      },
    });

    return updatedPayment;
  }

  /** Razorpay webhook handler – auto-sync payment updates */
  async handleWebhook(body: any, signature: string) {
    const webhookSecret = this.configService.get<string>(
      'RAZORPAY_WEBHOOK_SECRET',
    );

    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(body))
        .digest('hex');

      if (expectedSignature !== signature) {
        this.logger.warn('Webhook signature mismatch');
        throw new BadRequestException('Invalid webhook signature');
      }
    }

    const event = body.event;
    const paymentEntity = body.payload?.payment?.entity;

    if (!paymentEntity) {
      this.logger.warn(`Webhook event ${event} has no payment entity`);
      return { status: 'ignored' };
    }

    const razorpayOrderId = paymentEntity.order_id;
    const razorpayPaymentId = paymentEntity.id;

    const payment = await this.prisma.client.payment.findFirst({
      where: { razorpayOrderId },
    });

    if (!payment) {
      this.logger.warn(`No payment record found for order ${razorpayOrderId}`);
      return { status: 'not_found' };
    }

    switch (event) {
      case 'payment.captured':
        await this.prisma.client.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.SUCCESS,
            razorpayPaymentId,
          },
        });
        this.logger.log(`Payment ${payment.id} marked as SUCCESS via webhook`);
        break;

      case 'payment.failed':
        await this.prisma.client.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.FAILED,
            razorpayPaymentId,
            failureReason: paymentEntity.error_description || 'Payment failed',
          },
        });
        this.logger.log(`Payment ${payment.id} marked as FAILED via webhook`);
        break;

      default:
        this.logger.log(`Unhandled webhook event: ${event}`);
    }

    return { status: 'ok' };
  }

  /** Manually sync a single payment's status from Razorpay */
  async syncPaymentStatus(userId: string, paymentId: string, role: Role) {
    const payment = await this.prisma.client.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Only owner or admin can sync
    if (payment.userId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have access to this payment');
    }

    if (!payment.razorpayOrderId) {
      throw new BadRequestException(
        'No Razorpay order associated with this payment',
      );
    }

    // Fetch order from Razorpay
    let razorpayOrder: any;
    try {
      razorpayOrder = await this.razorpay.orders.fetch(
        payment.razorpayOrderId,
      );
    } catch (err: any) {
      this.logger.error(
        `Razorpay order fetch failed: ${err?.error?.description || err?.message || JSON.stringify(err)}`,
      );
      throw new BadRequestException(
        `Razorpay error: ${err?.error?.description || err?.message || 'Failed to fetch order status'}`,
      );
    }

    let newStatus = payment.status;
    let razorpayPaymentId = payment.razorpayPaymentId;

    if (razorpayOrder.status === 'paid') {
      newStatus = PaymentStatus.SUCCESS;
      // Try to get the payment ID from order payments
      const orderPayments = await this.razorpay.orders.fetchPayments(
        payment.razorpayOrderId,
      );
      if (orderPayments.items && orderPayments.items.length > 0) {
        const successfulPayment = orderPayments.items.find(
          (p: any) => p.status === 'captured',
        );
        if (successfulPayment) {
          razorpayPaymentId = successfulPayment.id;
        }
      }
    } else if (razorpayOrder.status === 'attempted') {
      // Check if there's a failed payment
      const orderPayments = await this.razorpay.orders.fetchPayments(
        payment.razorpayOrderId,
      );
      if (orderPayments.items && orderPayments.items.length > 0) {
        const failedPayment = orderPayments.items.find(
          (p: any) => p.status === 'failed',
        );
        if (failedPayment) {
          newStatus = PaymentStatus.FAILED;
          razorpayPaymentId = failedPayment.id;
        }
      }
    }

    const updatedPayment = await this.prisma.client.payment.update({
      where: { id: payment.id },
      data: {
        status: newStatus,
        razorpayPaymentId,
      },
    });

    return updatedPayment;
  }

  async findMyPayments(userId: string, dto: ListPaymentsDto) {
    const { page = 1, limit = 10, status, paymentType } = dto;
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (status) where.status = status;
    if (paymentType) where.paymentType = paymentType;

    const [data, total] = await Promise.all([
      this.prisma.client.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.payment.count({ where }),
    ]);

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  async findOne(userId: string, id: string, role: Role) {
    const payment = await this.prisma.client.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Check ownership or admin access
    if (payment.userId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have access to this payment');
    }

    return payment;
  }

  async findAll(dto: ListPaymentsDto) {
    const { page = 1, limit = 10, status, paymentType } = dto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) where.status = status;
    if (paymentType) where.paymentType = paymentType;

    const [data, total] = await Promise.all([
      this.prisma.client.payment.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.payment.count({ where }),
    ]);

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  }
}
