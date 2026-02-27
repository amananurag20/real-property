import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  MaxLength,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
  ArrayMinSize,
  IsInt,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RequestType, PropertyType } from '../../../generated/prisma/enums';

export class CreateRequestDto {
  @ApiProperty({
    enum: RequestType,
    example: RequestType.BUY,
    description: 'Type of property request',
  })
  @IsEnum(RequestType)
  requestType: RequestType;

  @ApiProperty({
    example: 'Looking for 3BHK apartment in Chandigarh',
    maxLength: 200,
    description: 'Title of the request',
  })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    example: 5000000,
    minimum: 0,
    description: 'Minimum budget in INR',
  })
  @IsNumber()
  @Min(0)
  budgetMin: number;

  @ApiProperty({
    example: 8000000,
    minimum: 0,
    description: 'Maximum budget in INR',
  })
  @IsNumber()
  @Min(0)
  budgetMax: number;

  @ApiPropertyOptional({
    enum: PropertyType,
    isArray: true,
    example: [PropertyType.APARTMENT, PropertyType.VILLA],
    description: 'Preferred property types',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(PropertyType, { each: true })
  preferredPropertyType?: PropertyType[];

  @ApiPropertyOptional({
    type: [String],
    example: ['Sector 43', 'Sector 17', 'Mohali Phase 7'],
    description: 'Preferred locations/sectors',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredLocations?: string[];

  @ApiPropertyOptional({
    example: 'Punjab',
    maxLength: 100,
    description: 'Preferred state',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  preferredState?: string;

  @ApiPropertyOptional({
    example: 1200,
    minimum: 0,
    description: 'Minimum area in sq ft',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minArea?: number;

  @ApiPropertyOptional({
    example: 2000,
    minimum: 0,
    description: 'Maximum area in sq ft',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxArea?: number;

  @ApiPropertyOptional({
    example: 3,
    minimum: 0,
    description: 'Minimum number of bedrooms',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  minBedrooms?: number;

  @ApiPropertyOptional({
    example: 'Within 3 months',
    maxLength: 200,
    description: 'Expected timeline for purchase/rent',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  timeline?: string;

  @ApiPropertyOptional({
    example: 'Looking for well-ventilated property with parking space',
    maxLength: 2000,
    description: 'Additional notes and requirements',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Parking space', 'Gym', 'Swimming pool'],
    description: 'List of specific requirements',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @ApiPropertyOptional({
    example: 'Phone',
    maxLength: 100,
    description: 'Preferred contact method (Phone, Email, WhatsApp, etc.)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  contactPreference?: string;
}
