import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttributeDataType } from '../enums/attribute-datatype.enum';

export class CreateAttributeDto {
    @ApiProperty({ maxLength: 120 })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @MinLength(1)
    @MaxLength(120)
    name!: string;

    @ApiProperty({ maxLength: 140, example: 'screen-size' })
    @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
    @IsString()
    @MinLength(1)
    @MaxLength(140)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    slug!: string;

    @ApiProperty({ enum: AttributeDataType })
    @IsEnum(AttributeDataType)
    dataType!: AttributeDataType;

    @ApiPropertyOptional({ maxLength: 40 })
    @IsOptional()
    @IsString()
    @MaxLength(40)
    unit?: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
