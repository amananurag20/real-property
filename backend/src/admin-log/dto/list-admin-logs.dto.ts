import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AdminAction } from '../../../generated/prisma/enums';

export class ListAdminLogsDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'PROPERTY_APPROVED', enum: AdminAction })
  @IsOptional()
  @IsEnum(AdminAction)
  action?: AdminAction;

  @ApiPropertyOptional({ example: 'property' })
  @IsOptional()
  @IsString()
  targetType?: string;

  @ApiPropertyOptional({ example: 'uuid-here' })
  @IsOptional()
  @IsString()
  targetId?: string;

  @ApiPropertyOptional({ example: 'uuid-here' })
  @IsOptional()
  @IsString()
  adminId?: string;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
