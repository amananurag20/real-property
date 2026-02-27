import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsArray,
  ArrayMinSize,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreateAgentProfileDto {
  @ApiPropertyOptional({ description: 'Agency name', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  agencyName?: string;

  @ApiProperty({ description: 'Service areas', type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  serviceAreas!: string[];

  @ApiProperty({ description: 'Years of experience', minimum: 0, maximum: 50 })
  @IsInt()
  @Min(0)
  @Max(50)
  experience!: number;

  @ApiProperty({ description: 'Specialization areas', type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  specialization!: string[];

  @ApiPropertyOptional({ description: 'Agent bio', maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;

  @ApiPropertyOptional({ description: 'Profile photo URL' })
  @IsOptional()
  @IsString()
  profilePhoto?: string;

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
}
