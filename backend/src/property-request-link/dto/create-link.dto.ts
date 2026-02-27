import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    description: 'Property UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  propertyId: string;

  @ApiProperty({
    description: 'Property request UUID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  requestId: string;

  @ApiProperty({
    description: 'Agent note about the match',
    example: 'This property matches your requirements perfectly.',
    required: false,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  agentNote?: string;
}
