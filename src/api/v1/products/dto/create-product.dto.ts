import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';
import { ProductStatus } from '../enums/product-status.enum';
import { AttributeValueDto } from './attribute-value.dto';

export class CreateProductDto {
    @ApiProperty({ maxLength: 255 })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    name!: string;

    @ApiProperty({ maxLength: 255, example: 'smartphone-x' })
    @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    slug!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string | null;

    @ApiProperty({ pattern: ENTITY_ID_PATTERN.source })
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    categoryId!: string;

    @ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
    @IsOptional()
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    brandId?: string | null;

    @ApiPropertyOptional({ enum: ProductStatus, default: ProductStatus.DRAFT })
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;

    @ApiPropertyOptional({ type: [AttributeValueDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttributeValueDto)
    attributes?: AttributeValueDto[];
}
