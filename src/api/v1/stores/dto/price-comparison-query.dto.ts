import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum PriceComparisonSort {
    LOWEST_PRICE = 'lowestPrice',
    HIGHEST_PRICE = 'highestPrice',
}

export class PriceComparisonQueryDto {
    @ApiPropertyOptional({ enum: PriceComparisonSort, default: PriceComparisonSort.LOWEST_PRICE })
    @IsOptional()
    @IsEnum(PriceComparisonSort)
    sort: PriceComparisonSort = PriceComparisonSort.LOWEST_PRICE;
}
