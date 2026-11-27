import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	UpdateDateColumn,
} from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Category } from '../../categories/entities/category.entity';
import { ProductStatus } from '../enums/product-status.enum';
import { Brand } from './brand.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductImage } from './product-image.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';
import { ProductIdentifier } from './product-identifier.entity';

@Entity('products')
@Index('uq_products_slug', ['slug'], { unique: true })
@Index('IDX_products_category_status', ['categoryId', 'status'])
@Index('IDX_products_brand_status', ['brandId', 'status'])
export class Product extends Nanoid8Entity {
	@Column({ length: 255 })
	name!: string;

	@Column({ length: 255 })
	slug!: string;

	@Column({ type: 'text', nullable: true })
	description!: string | null;

	@Column({ name: 'category_id', type: 'varchar', length: 36 })
	categoryId!: string;

	@ManyToOne(() => Category, { onDelete: 'RESTRICT' })
	@JoinColumn({ name: 'category_id' })
	category!: Category;

	@Column({ name: 'brand_id', type: 'varchar', length: 8, nullable: true })
	brandId!: string | null;

	@ManyToOne(() => Brand, (brand) => brand.products, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	@JoinColumn({ name: 'brand_id' })
	brand!: Brand | null;

	@Column({ type: 'varchar', length: 16, default: ProductStatus.DRAFT })
	status!: ProductStatus;

	@OneToMany(() => ProductVariant, (variant) => variant.product)
	variants!: ProductVariant[];

	@OneToMany(() => ProductImage, (image) => image.product)
	images!: ProductImage[];

	@OneToMany(() => ProductAttributeValue, (value) => value.product)
	attributeValues!: ProductAttributeValue[];

	@OneToMany(() => ProductIdentifier, (identifier) => identifier.product)
	identifiers!: ProductIdentifier[];

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at', nullable: true })
	deletedAt!: Date | null;
}
