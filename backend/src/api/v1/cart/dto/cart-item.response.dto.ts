import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { StoreProduct } from '../../stores/entities/store-product.entity';
import { Price } from '../../stores/entities/price.entity';

export class CartItemResponseDto {
	@ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه آیتم' })
	@Expose()
	id!: string;

	@ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه سبد خرید' })
	@Expose()
	cartId!: string;

	@ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه محصول فروشگاه' })
	@Expose()
	storeProductId!: string;

	@ApiProperty({ description: 'تعداد' })
	@Expose()
	quantity!: number;

	@ApiProperty({ type: () => StoreProduct, description: 'محصول فروشگاه' })
	@Expose()
	@Type(() => StoreProduct)
	storeProduct!: StoreProduct;

	@ApiProperty({ description: 'تاریخ ایجاد' })
	@Expose()
	createdAt!: Date;

	@ApiProperty({ description: 'تاریخ به‌روزرسانی' })
	@Expose()
	updatedAt!: Date;

	@ApiProperty({ description: 'مبلغ کل این سطر (تعداد × قیمت واحد)' })
	@Expose()
	get lineTotal(): number {
		const price = this.storeProduct?.price as Price | undefined;
		const amount = price ? parseFloat(price.amount) : 0;
		return this.quantity * amount;
	}
}
