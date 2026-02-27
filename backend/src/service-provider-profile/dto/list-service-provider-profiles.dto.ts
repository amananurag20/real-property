import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ServiceProviderType } from '../../../generated/prisma/enums';

export class ListServiceProviderProfilesDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ServiceProviderType, description: 'Filter by provider type' })
  @IsOptional()
  @IsEnum(ServiceProviderType)
  type?: ServiceProviderType;

  @ApiPropertyOptional({ description: 'Filter by location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Minimum rating', minimum: 0, maximum: 5 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  minRating?: number;
}
