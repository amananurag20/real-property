import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    description: 'Rating from 1 to 5',
    required: false,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

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
}
