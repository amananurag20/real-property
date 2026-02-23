import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiProperty({ description: 'Refresh token from verify-otp or previous refresh' })
    @IsString()
    @IsNotEmpty()
    refreshToken!: string;
}
