import {
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/enums';

export class RegisterDto {
  @ApiProperty({
    example: '9876543210',
    description: '10-digit Indian mobile number',
  })
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number.' })
  phone!: string;

  @ApiProperty({ example: 'Amit Sharma' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'amit@example.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ enum: Role, default: Role.USER })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
