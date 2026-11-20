import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsObject,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAttributeOptionDto {
    @ApiProperty({ maxLength: 120 })
    @Transform(({ value }: { value: unknown }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @MinLength(1)
    @MaxLength(120)
    label!: string;

    @ApiProperty({ maxLength: 140 })
    @Transform(({ value }: { value: unknown }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @MinLength(1)
    @MaxLength(140)
    value!: string;

    @ApiPropertyOptional({
        type: 'object',
        additionalProperties: true,
        example: { hex: '#000000' },
    })
    @IsOptional()
    @IsObject()
    metadata?: Record<string, unknown> | null;

    @ApiPropertyOptional({ description: 'فعال یا غیرفعال بودن گزینه ویژگی' })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
