import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { ListPaymentsDto } from './dto/list-payments.dto';
import { buildPaginationMeta } from '../common/dto/pagination.dto';
import { PaymentStatus } from '../../generated/prisma/enums';
import { Role } from '../../generated/prisma/enums';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, dto: CreatePaymentDto) {
    // Phase 1: Test mode - Just create the payment record
    // Phase 2: Integrate with Razorpay SDK to create actual order
    const payment = await this.prisma.payment.create({
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
      },
    });

    return {
      paymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
    };
  }

  async verifyPayment(userId: string, dto: VerifyPaymentDto) {
    // Find payment by razorpayOrderId
    const payment = await this.prisma.payment.findFirst({
      where: {
        id: dto.razorpayOrderId,
        userId,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Phase 1: Test mode - Just update status to SUCCESS
    // Phase 2: Verify signature with Razorpay SDK
    const updatedPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.SUCCESS,
        razorpayPaymentId: dto.razorpayPaymentId,
        razorpaySignature: dto.razorpaySignature,
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
      this.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  async findOne(userId: string, id: string, role: Role) {
    const payment = await this.prisma.payment.findUnique({
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
      this.prisma.payment.findMany({
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
      this.prisma.payment.count({ where }),
    ]);

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  }
}
