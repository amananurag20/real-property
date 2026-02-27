import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { TriangleLinkStatus } from '../../../generated/prisma/enums';

export class ListLinksDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by link status',
    enum: TriangleLinkStatus,
    example: TriangleLinkStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(TriangleLinkStatus)
  status?: TriangleLinkStatus;

  @ApiPropertyOptional({
    description: 'Filter by property UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiPropertyOptional({
    description: 'Filter by request UUID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsOptional()
  @IsUUID()
  requestId?: string;
}
