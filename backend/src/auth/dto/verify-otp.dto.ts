import { IsString, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ example: '9876543210' })
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number.' })
  phone!: string;

  @ApiProperty({
    example: '1234',
    description: 'OTP (hardcoded: 1234 in Phase 1)',
  })
  @IsString()
  @Length(4, 6)
  otp!: string;
}
