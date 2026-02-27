import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MaxLength } from 'class-validator';

export class BuyerResponseDto {
  @ApiProperty({
    description: 'Buyer response message',
    example: 'Yes, I am interested in viewing this property.',
    maxLength: 1000,
  })
  @IsString()
  @MaxLength(1000)
  buyerResponse!: string;

  @ApiProperty({
    description: 'Whether the buyer is interested',
    example: true,
  })
  @IsBoolean()
  interested!: boolean;
}
