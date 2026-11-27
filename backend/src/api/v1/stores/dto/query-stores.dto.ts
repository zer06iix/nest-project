import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StoreStatus } from '../enums/store-status.enum';

export class QueryStoresDto {
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

	@ApiPropertyOptional({ description: 'عبارت جست‌وجو در نام فروشگاه' })
	@IsOptional()
	@IsString()
	@MaxLength(255)
	search?: string;

	@ApiPropertyOptional({ enum: StoreStatus })
	@IsOptional()
	@IsEnum(StoreStatus)
	status?: StoreStatus;
}
