import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class ListAgentProfilesDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by service area' })
  @IsOptional()
  @IsString()
  serviceArea?: string;

  @ApiPropertyOptional({
    description: 'Minimum rating',
    minimum: 0,
    maximum: 5,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  minRating?: number;
}
