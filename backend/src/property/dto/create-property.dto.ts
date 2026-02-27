import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  MaxLength,
  IsArray,
  IsEmail,
  Matches,
  IsLatitude,
  IsLongitude,
  Max,
} from 'class-validator';
import { PropertyType, PropertyCategory, ListerType } from '../../generated/prisma/enums';

export class CreatePropertyDto {
  @ApiProperty({ maxLength: 200 })
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiProperty({ enum: PropertyType })
  @IsEnum(PropertyType)
  propertyType!: PropertyType;

  @ApiProperty({ enum: PropertyCategory })
  @IsEnum(PropertyCategory)
  category!: PropertyCategory;

  @ApiProperty({ minimum: 0, description: 'Price in INR' })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiPropertyOptional({ default: 'total' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  priceUnit?: string = 'total';

  @ApiProperty({ minimum: 0, description: 'Area size' })
  @IsNumber()
  @Min(0)
  areaSize!: number;

  @ApiPropertyOptional({ default: 'sqft' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  areaUnit?: string = 'sqft';

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  bathrooms?: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  parking?: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  floors?: number;

  @ApiPropertyOptional({ minimum: 1800, maximum: 2100 })
  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(2100)
  yearBuilt?: number;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  state!: string;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  city!: string;

  @ApiProperty({ maxLength: 200 })
  @IsString()
  @MaxLength(200)
  locality!: string;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  address?: string;

  @ApiPropertyOptional({ pattern: '^\\d{6}$' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'Pincode must be 6 digits' })
  pincode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @ApiProperty({ maxLength: 5000 })
  @IsString()
  @MaxLength(5000)
  description!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({ enum: ListerType })
  @IsEnum(ListerType)
  listerType!: ListerType;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  contactName?: string;

  @ApiPropertyOptional({ pattern: '^[6-9]\\d{9}$' })
  @IsOptional()
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Contact phone must be a valid 10-digit Indian mobile number' })
  contactPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}
