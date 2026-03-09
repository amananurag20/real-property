import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { ListPaymentsDto } from './dto/list-payments.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { Role } from '../auth/guards/roles.guard';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('config')
  @ApiOperation({ summary: 'Get Razorpay config (public key)' })
  @ResponseMessage('Payment config fetched successfully')
  getConfig() {
    return this.paymentService.getConfig();
  }

  @Post('create-order')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a payment order' })
  @ResponseMessage('Payment order created successfully')
  createOrder(
    @CurrentUser('id') userId: string,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentService.createOrder(userId, dto);
  }

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify a payment' })
  @ResponseMessage('Payment verified successfully')
  verifyPayment(
    @CurrentUser('id') userId: string,
    @Body() dto: VerifyPaymentDto,
  ) {
    return this.paymentService.verifyPayment(userId, dto);
  }

  @Post('webhook')
  @SkipThrottle()
  @ApiOperation({ summary: 'Razorpay webhook handler' })
  @ResponseMessage('Webhook processed')
  handleWebhook(
    @Body() body: any,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    return this.paymentService.handleWebhook(body, signature);
  }

  @Post(':id/sync')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Manually sync payment status from Razorpay' })
  @ResponseMessage('Payment status synced successfully')
  syncPaymentStatus(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: Role,
    @Param('id') id: string,
  ) {
    return this.paymentService.syncPaymentStatus(userId, id, role);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my payments' })
  findMyPayments(
    @CurrentUser('id') userId: string,
    @Query() dto: ListPaymentsDto,
  ) {
    return this.paymentService.findMyPayments(userId, dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single payment' })
  findOne(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: Role,
    @Param('id') id: string,
  ) {
    return this.paymentService.findOne(userId, id, role);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all payments (Admin only)' })
  findAll(@Query() dto: ListPaymentsDto) {
    return this.paymentService.findAll(dto);
  }
}
