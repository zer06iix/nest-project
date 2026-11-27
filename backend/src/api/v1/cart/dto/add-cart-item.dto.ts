import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';

export class AddCartItemDto {
	@ApiProperty({ pattern: ENTITY_ID_PATTERN.source, description: 'شناسه محصول فروشگاه' })
	@IsNotEmpty()
	@IsString()
	@Matches(ENTITY_ID_PATTERN)
	storeProductId!: string;

	@ApiProperty({ minimum: 1, default: 1, description: 'تعداد آیتم' })
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	quantity!: number;
}
