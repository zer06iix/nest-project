import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';
import { StoreProductStatus } from '../enums/store-product-status.enum';

export class UpdateStoreProductDto {
    @ApiPropertyOptional({ maxLength: 2048 })
    @IsOptional()
    @IsUrl({ require_protocol: true })
    @MaxLength(2048)
    externalUrl?: string;

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
    @Transform(({ value }: { value: unknown }) => (value === null ? value : Number(value)))
    @IsInt()
    @Min(0)
    stockQuantity?: number | null;

    @ApiPropertyOptional({ enum: StoreProductStatus })
    @IsOptional()
    @IsEnum(StoreProductStatus)
    status?: StoreProductStatus;
}
