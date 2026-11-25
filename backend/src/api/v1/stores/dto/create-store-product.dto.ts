import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
    Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';
import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';
import { StoreProductStatus } from '../enums/store-product-status.enum';

export class CreateStoreProductDto {
    @ApiProperty({ pattern: ENTITY_ID_PATTERN.source })
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    storeId?: string;

    @ApiProperty({ pattern: ENTITY_ID_PATTERN.source })
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    productVariantId!: string;

    @ApiPropertyOptional({ maxLength: 2048 })
    @IsOptional()
    @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
    @MaxLength(2048)
    externalUrl?: string | null;

    @ApiProperty({ minimum: 0 })
    @Transform(({ value }) => String(value))
    @IsString()
    @Matches(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, {
        message: 'currentPrice must be a positive decimal',
    })
    currentPrice!: string;

    @ApiPropertyOptional({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER })
    @IsOptional()
    @Transform(({ value }: { value: unknown }) => {
        if (value === null) return value;
        if (typeof value === 'string') return value;
        if (typeof value === 'number') return value.toString();
        return JSON.stringify(value);
    })
    @IsString()
    @Matches(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, {
        message: 'originalPrice must be a decimal',
    })
    originalPrice?: string | null;

    @ApiPropertyOptional({ default: 'IRR', minLength: 3, maxLength: 3 })
    @IsOptional()
    @IsString()
    @Matches(/^[A-Z]{3}$/)
    currency?: string;

    @ApiPropertyOptional({ maxLength: 255 })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    externalProductId?: string | null;

    @ApiPropertyOptional({ maxLength: 255 })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    title?: string | null;

    @ApiPropertyOptional({ description: 'توضیحات اختصاصی فروشگاه برای محصول' })
    @IsOptional()
    @IsString()
    description?: string | null;

    @ApiPropertyOptional({ enum: AvailabilityStatus })
    @IsOptional()
    @IsEnum(AvailabilityStatus)
    availabilityStatus?: AvailabilityStatus;

    @ApiPropertyOptional({ enum: StockStatus })
    @IsOptional()
    @IsEnum(StockStatus)
    stockStatus?: StockStatus;

    @ApiPropertyOptional({ description: 'فعال یا غیرفعال بودن لیست فروشگاه' })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ minimum: 0 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    stockQuantity?: number | null;

    @ApiPropertyOptional({ enum: StoreProductStatus })
    @IsOptional()
    @IsEnum(StoreProductStatus)
    status?: StoreProductStatus;
}
