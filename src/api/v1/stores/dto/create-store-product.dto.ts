import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    Max,
    MaxLength,
    Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';
import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';

export class CreateStoreProductDto {
    @ApiProperty({ pattern: ENTITY_ID_PATTERN.source })
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    productVariantId!: string;

    @ApiProperty({ maxLength: 2048 })
    @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
    @MaxLength(2048)
    externalUrl!: string;

    @ApiProperty({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER })
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    @Max(Number.MAX_SAFE_INTEGER)
    currentPrice!: number;

    @ApiPropertyOptional({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER })
    @IsOptional()
    @Transform(({ value }) => value === null ? value : Number(value))
    @IsInt()
    @Min(0)
    @Max(Number.MAX_SAFE_INTEGER)
    originalPrice?: number | null;

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

    @ApiPropertyOptional()
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

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
