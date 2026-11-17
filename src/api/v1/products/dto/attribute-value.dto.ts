import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';

export class AttributeValueDto {
    @ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
    @IsOptional()
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    attributeId?: string;

    @ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
    @IsOptional()
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    optionId?: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(10000)
    valueText?: string | null;

    @ApiPropertyOptional({ example: 6.7 })
    @IsOptional()
    @Transform(({ value }) => value === '' || value === null ? value : Number(value))
    @IsNumber({ allowNaN: false, allowInfinity: false })
    valueNumber?: number | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    valueBoolean?: boolean | null;

    @ApiPropertyOptional({ example: '2025-01-01' })
    @IsOptional()
    @IsDateString()
    valueDate?: string | null;
}
