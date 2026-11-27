import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';
import { ProductStatus } from '../enums/product-status.enum';
import { AvailabilityStatus } from '../../stores/enums/availability-status.enum';
import { StockStatus } from '../../stores/enums/stock-status.enum';

export enum ProductSort {
	CREATED_AT = 'createdAt',
	NAME = 'name',
	PRICE = 'price',
}

export class QueryProductsDto {
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

	@ApiPropertyOptional({ description: 'عبارت جست‌وجو در نام محصول' })
	@IsOptional()
	@IsString()
	@MaxLength(255)
	search?: string;

	@ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
	@IsOptional()
	@IsString()
	@Matches(ENTITY_ID_PATTERN)
	categoryId?: string;

	@ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
	@IsOptional()
	@IsString()
	@Matches(ENTITY_ID_PATTERN)
	brandId?: string;

	@ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
	@IsOptional()
	@IsString()
	@Matches(ENTITY_ID_PATTERN)
	storeId?: string;

	@ApiPropertyOptional({ enum: ProductStatus })
	@IsOptional()
	@IsEnum(ProductStatus)
	status?: ProductStatus;

	@ApiPropertyOptional({ enum: AvailabilityStatus })
	@IsOptional()
	@IsEnum(AvailabilityStatus)
	availabilityStatus?: AvailabilityStatus;

	@ApiPropertyOptional({ enum: StockStatus })
	@IsOptional()
	@IsEnum(StockStatus)
	stockStatus?: StockStatus;

	@ApiPropertyOptional({ minimum: 0 })
	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsInt()
	@Min(0)
	@Max(Number.MAX_SAFE_INTEGER)
	minPrice?: number;

	@ApiPropertyOptional({ minimum: 0 })
	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsInt()
	@Min(0)
	@Max(Number.MAX_SAFE_INTEGER)
	maxPrice?: number;

	@ApiPropertyOptional({ pattern: ENTITY_ID_PATTERN.source })
	@IsOptional()
	@IsString()
	@Matches(ENTITY_ID_PATTERN)
	attributeId?: string;

	@ApiPropertyOptional({ description: 'مقدار ویژگی برای فیلتر محصولات' })
	@IsOptional()
	@IsString()
	attributeValue?: string;

	@ApiPropertyOptional({ enum: ProductSort, default: ProductSort.CREATED_AT })
	@IsOptional()
	@IsEnum(ProductSort)
	sortBy: ProductSort = ProductSort.CREATED_AT;

	@ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
	@IsOptional()
	@IsEnum(['ASC', 'DESC'])
	sortOrder: 'ASC' | 'DESC' = 'DESC';
}
