import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TriangleLinkStatus } from '../../../generated/prisma/enums';

export class UpdateLinkStatusDto {
  @ApiProperty({
    description: 'Triangle link status',
    enum: TriangleLinkStatus,
    example: TriangleLinkStatus.BUYER_NOTIFIED,
  })
  @IsEnum(TriangleLinkStatus)
  status!: TriangleLinkStatus;
}
