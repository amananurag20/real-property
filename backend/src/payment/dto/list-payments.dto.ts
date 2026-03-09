import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaymentStatus, PaymentType } from '../../../generated/prisma/enums';

export class ListPaymentsDto extends PaginationDto {
  @ApiProperty({
    description: 'Filter by payment status',
    required: false,
    enum: PaymentStatus,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({
    description: 'Filter by payment type',
    required: false,
    enum: PaymentType,
  })
  @IsOptional()
  @IsEnum(PaymentType)
  paymentType?: PaymentType;
}
