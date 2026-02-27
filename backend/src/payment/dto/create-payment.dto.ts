import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { PaymentType } from '../../../generated/prisma/enums';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Payment amount', minimum: 1 })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ description: 'Type of payment', enum: PaymentType })
  @IsEnum(PaymentType)
  @IsNotEmpty()
  paymentType: PaymentType;

  @ApiProperty({ description: 'Payment description', required: false, maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ description: 'Reference type (e.g., "Property", "Service")', required: false, maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  referenceType?: string;

  @ApiProperty({ description: 'Reference ID', required: false })
  @IsOptional()
  @IsUUID()
  referenceId?: string;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
