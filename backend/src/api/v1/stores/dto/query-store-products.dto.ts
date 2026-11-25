import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';
import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';
import { StoreProductStatus } from '../enums/store-product-status.enum';

export class QueryStoreProductsDto {
    @ApiPropertyOptional({ minimum: 1, default: 1 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    page = 1;

    @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 20 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    @Max(100)
    limit = 20;

    @ApiPropertyOptional({
        description: 'عبارت جست‌وجو در عنوان، توضیح یا نام محصول',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    search?: string;

    @ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
    @IsOptional()
    @Matches(ENTITY_ID_PATTERN)
    storeId?: string;

    @ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
    @IsOptional()
    @Matches(ENTITY_ID_PATTERN)
    productId?: string;

    @ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
    @IsOptional()
    @Matches(ENTITY_ID_PATTERN)
    productVariantId?: string;

    @IsOptional()
    @IsEnum(AvailabilityStatus)
    availabilityStatus?: AvailabilityStatus;

    @IsOptional()
    @IsEnum(StockStatus)
    stockStatus?: StockStatus;

    @IsOptional()
    @IsEnum(StoreProductStatus)
    status?: StoreProductStatus;

    @IsOptional()
    @Transform(({ value }) => String(value))
    @Matches(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/)
    minPrice?: string;

    @IsOptional()
    @Transform(({ value }) => String(value))
    @Matches(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/)
    maxPrice?: string;
}
