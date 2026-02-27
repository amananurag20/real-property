import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsArray,
  ArrayMinSize,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';
import { ServiceProviderType } from '../../../generated/prisma/enums';

export class CreateServiceProviderProfileDto {
  @ApiProperty({ enum: ServiceProviderType, description: 'Type of service provider' })
  @IsEnum(ServiceProviderType)
  type!: ServiceProviderType;

  @ApiPropertyOptional({ description: 'Business name', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  businessName?: string;

  @ApiProperty({ description: 'Service location', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  location!: string;

  @ApiPropertyOptional({ description: 'State', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @ApiPropertyOptional({ description: 'Address', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  address?: string;

  @ApiProperty({ description: 'Years of experience', minimum: 0, maximum: 50 })
  @IsInt()
  @Min(0)
  @Max(50)
  experience!: number;

  @ApiPropertyOptional({ description: 'Service description', maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ description: 'Services offered', type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  services!: string[];

  @ApiPropertyOptional({ description: 'Education qualifications', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  education?: string[];

  @ApiPropertyOptional({ description: 'Languages spoken', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({ description: 'Contact phone number (10 digits starting with 6-9)' })
  @IsOptional()
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Contact phone must be a valid 10-digit Indian phone number' })
  contactPhone?: string;

  @ApiPropertyOptional({ description: 'Contact email address' })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiPropertyOptional({ description: 'WhatsApp number (10 digits starting with 6-9)' })
  @IsOptional()
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'WhatsApp number must be a valid 10-digit Indian phone number' })
  whatsappNumber?: string;

  @ApiPropertyOptional({ description: 'Profile photo URL' })
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @ApiPropertyOptional({ description: 'Availability details', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  availability?: string;
}
