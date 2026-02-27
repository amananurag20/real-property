import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Transform } from 'class-transformer';

export class ListInquiriesDto extends PaginationDto {
  @ApiProperty({ description: 'Filter by resolution status', required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isResolved?: boolean;

  @ApiProperty({ description: 'Filter by property ID', required: false })
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiProperty({ description: 'Filter by agent ID', required: false })
  @IsOptional()
  @IsUUID()
  agentId?: string;
}
