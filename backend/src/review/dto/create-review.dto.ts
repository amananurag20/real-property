import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'Rating from 1 to 5', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty({ description: 'Review title', required: false, maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiProperty({
    description: 'Review comment',
    required: false,
    maxLength: 2000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  comment?: string;

  @ApiProperty({ description: 'Property ID to review', required: false })
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiProperty({ description: 'Agent profile ID to review', required: false })
  @IsOptional()
  @IsUUID()
  agentProfileId?: string;

  @ApiProperty({
    description: 'Service provider profile ID to review',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  serviceProviderProfileId?: string;
}
