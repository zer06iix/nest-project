import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';
import { VariantAttributeValue } from './variant-attribute-value.entity';
import { StoreProduct } from '../../stores/entities/store-product.entity';

@Entity('product_variants')
@Index('IDX_product_variants_product_active', ['productId', 'isActive'])
@Index('uq_product_variants_sku', ['sku'], {
    unique: true,
    where: '"sku" IS NOT NULL',
})
@Index('uq_product_variants_default', ['productId'], {
    unique: true,
    where: '"is_default" = true',
})
export class ProductVariant extends Nanoid8Entity {
    @Column({ name: 'product_id', type: 'varchar', length: 8 })
    productId!: string;

    @ManyToOne(() => Product, (product) => product.variants, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({ length: 255 })
    title!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    sku!: string | null;

    @Column({ name: 'is_default', default: false })
    isDefault!: boolean;

    @Column({ name: 'is_active', default: true })
    isActive!: boolean;

    @Column({ name: 'sort_order', type: 'integer', default: 0 })
    sortOrder!: number;

    @OneToMany(() => VariantAttributeValue, (value) => value.variant)
    attributeValues!: VariantAttributeValue[];

    @OneToMany(() => StoreProduct, (listing) => listing.productVariant)
    storeProducts!: StoreProduct[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
