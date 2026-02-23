import { IsString, IsOptional, IsEmail, MaxLength, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: '9876543210', description: '10-digit Indian mobile number' })
    @IsString()
    @Matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number.' })
    phone!: string;

    @ApiPropertyOptional({ example: 'Amit Sharma' })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @ApiPropertyOptional({ example: 'amit@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;
}
