import { IsBoolean, IsEnum, IsInt, IsOptional, Matches, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttributeDisplayType } from '../enums/attribute-display-type.enum';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';

export class CreateCategoryAttributeDto {
    @ApiProperty({ pattern: ENTITY_ID_PATTERN.source })
    @Matches(ENTITY_ID_PATTERN)
    attributeId!: string;

    @ApiPropertyOptional({ description: 'آیا مقدار این ویژگی الزامی است؟' })
    @IsOptional()
    @IsBoolean()
    isRequired?: boolean;

    @ApiPropertyOptional({ description: 'آیا این ویژگی قابل فیلتر کردن است؟' })
    @IsOptional()
    @IsBoolean()
    isFilterable?: boolean;

    @ApiPropertyOptional({ description: 'آیا این ویژگی روی کارت نمایش داده می‌شود؟' })
    @IsOptional()
    @IsBoolean()
    isVisibleOnCard?: boolean;

    @ApiPropertyOptional({ description: 'آیا این ویژگی در صفحه محصول نمایش داده می‌شود؟' })
    @IsOptional()
    @IsBoolean()
    isVisibleOnProduct?: boolean;

    @ApiPropertyOptional({ description: 'آیا این ویژگی مخصوص نوع محصول است؟' })
    @IsOptional()
    @IsBoolean()
    isVariantAttribute?: boolean;

    @ApiPropertyOptional({ enum: AttributeDisplayType })
    @IsOptional()
    @IsEnum(AttributeDisplayType)
    displayType?: AttributeDisplayType;

    @ApiPropertyOptional({ minimum: 0 })
    @IsOptional()
    @IsInt()
    @Min(0)
    sortOrder?: number;
}
