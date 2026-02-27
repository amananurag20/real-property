import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class ListReviewsDto extends PaginationDto {
  @ApiProperty({ description: 'Filter by property ID', required: false })
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiProperty({ description: 'Filter by agent profile ID', required: false })
  @IsOptional()
  @IsUUID()
  agentProfileId?: string;

  @ApiProperty({ description: 'Filter by service provider profile ID', required: false })
  @IsOptional()
  @IsUUID()
  serviceProviderProfileId?: string;

  @ApiProperty({ description: 'Minimum rating filter', required: false, minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  minRating?: number;
}
