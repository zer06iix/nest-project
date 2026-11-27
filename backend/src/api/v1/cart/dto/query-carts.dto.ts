import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';
import { CartStatus } from '../enums/cart-status.enum';

export class QueryCartsDto {
	@ApiPropertyOptional({
		pattern: ENTITY_ID_PATTERN.source,
		description: 'فیلتر بر اساس شناسه کاربر',
	})
	@IsOptional()
	@IsString()
	@Matches(ENTITY_ID_PATTERN)
	userId?: string;

	@ApiPropertyOptional({ enum: CartStatus, description: 'فیلتر بر اساس وضعیت سبد خرید' })
	@IsOptional()
	@IsEnum(CartStatus)
	status?: CartStatus;

	@ApiPropertyOptional({ minimum: 1, default: 1, description: 'شماره صفحه' })
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@ApiPropertyOptional({
		minimum: 1,
		maximum: 100,
		default: 20,
		description: 'تعداد آیتم در هر صفحه',
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(100)
	limit?: number = 20;

	@ApiPropertyOptional({ description: 'فیلد مرتب‌سازی' })
	@IsOptional()
	@IsString()
	sortBy?: string = 'createdAt';

	@ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC', description: 'ترتیب مرتب‌سازی' })
	@IsOptional()
	@IsString()
	sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
