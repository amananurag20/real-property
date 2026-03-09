import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RequestType } from '../../../generated/prisma/enums';

export class ListRequestsDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: RequestType,
    example: RequestType.BUY,
    description: 'Filter by request type',
  })
  @IsOptional()
  @IsEnum(RequestType)
  requestType?: RequestType;

  @ApiPropertyOptional({
    example: 'Punjab',
    description: 'Filter by preferred state',
  })
  @IsOptional()
  @IsString()
  preferredState?: string;

  @ApiPropertyOptional({
    example: 5000000,
    minimum: 0,
    description:
      'Filter by minimum budget (finds requests with budgetMax >= this value)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minBudget?: number;

  @ApiPropertyOptional({
    example: 10000000,
    minimum: 0,
    description:
      'Filter by maximum budget (finds requests with budgetMin <= this value)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxBudget?: number;
}
