import { IsBoolean, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AttributeDisplayType } from '../enums/attribute-display-type.enum';

export class UpdateCategoryAttributeDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isRequired?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isFilterable?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isVisibleOnCard?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isVisibleOnProduct?: boolean;

    @ApiPropertyOptional()
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
