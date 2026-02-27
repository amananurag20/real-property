import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsInt,
  IsBoolean,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

export class PropertyImageDto {
  @ApiProperty()
  @IsString()
  url!: string;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  caption?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class AddImagesDto {
  @ApiProperty({ type: [PropertyImageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyImageDto)
  @ArrayMinSize(1)
  images!: PropertyImageDto[];
}
