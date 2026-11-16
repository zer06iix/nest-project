import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ maxLength: 120 })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @MinLength(1)
    @MaxLength(120)
    name!: string;

    @ApiProperty({ maxLength: 140, example: 'mobile-phones' })
    @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
    @IsString()
    @MinLength(1)
    @MaxLength(140)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    slug!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string | null;

    @ApiPropertyOptional({ maxLength: 2048 })
    @IsOptional()
    @IsString()
    @MaxLength(2048)
    imageUrl?: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ maxLength: 160 })
    @IsOptional()
    @IsString()
    @MaxLength(160)
    seoTitle?: string | null;

    @ApiPropertyOptional({ maxLength: 320 })
    @IsOptional()
    @IsString()
    @MaxLength(320)
    seoDescription?: string | null;

    @ApiPropertyOptional({ format: 'uuid', nullable: true })
    @IsOptional()
    @IsUUID()
    parentId?: string | null;
}
