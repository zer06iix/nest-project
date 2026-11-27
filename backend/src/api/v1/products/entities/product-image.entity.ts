import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';

@Entity('product_images')
@Index('uq_product_images_primary', ['productId'], {
	unique: true,
	where: '"is_primary" = true',
})
@Index('IDX_product_images_order', ['productId', 'sortOrder'])
export class ProductImage extends Nanoid8Entity {
	@Column({ name: 'product_id', type: 'varchar', length: 8 })
	productId!: string;

	@ManyToOne(() => Product, (product) => product.images, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'product_id' })
	product!: Product;

	@Column({ type: 'varchar', length: 2048 })
	url!: string;

	@Column({ name: 'alt_text', type: 'varchar', length: 255, nullable: true })
	altText!: string | null;

	@Column({ name: 'is_primary', default: false })
	isPrimary!: boolean;

	@Column({ name: 'sort_order', type: 'integer', default: 0 })
	sortOrder!: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;
}
