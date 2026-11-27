import {
	Check,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	UpdateDateColumn,
} from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { StoreProduct } from './store-product.entity';

@Entity('prices')
@Check('CHK_prices_amount_positive', '"amount" > 0')
@Check(
	'CHK_prices_original_amount_valid',
	'"original_amount" IS NULL OR "original_amount" >= "amount"',
)
export class Price extends Nanoid8Entity {
	@Column({
		name: 'store_product_id',
		type: 'varchar',
		length: 8,
		unique: true,
	})
	storeProductId!: string;

	@OneToOne(() => StoreProduct, (storeProduct) => storeProduct.price, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'store_product_id' })
	storeProduct!: StoreProduct;

	@Column({ type: 'numeric', precision: 20, scale: 6 })
	amount!: string;

	@Column({
		name: 'original_amount',
		type: 'numeric',
		precision: 20,
		scale: 6,
		nullable: true,
	})
	originalAmount!: string | null;

	@Column({ type: 'varchar', length: 3, default: 'IRR' })
	currency!: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date;
}
