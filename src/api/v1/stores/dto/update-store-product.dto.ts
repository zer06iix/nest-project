import { IsBoolean, IsEnum, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';

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
