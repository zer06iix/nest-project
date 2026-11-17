import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Store } from './store.entity';
import { ProductVariant } from '../../products/entities/product-variant.entity';
import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';
import { Price } from './price.entity';
import { PriceHistory } from './price-history.entity';

@Entity('store_products')
@Index('uq_store_products_store_variant', ['storeId', 'productVariantId'], { unique: true })
@Index('uq_store_products_external_id', ['storeId', 'externalProductId'], {
    unique: true,
    where: '"external_product_id" IS NOT NULL',
})
@Index('IDX_store_products_active_stock', ['isActive', 'availabilityStatus', 'stockStatus'])
export class StoreProduct extends Nanoid8Entity {
    @Column({ name: 'store_id', type: 'varchar', length: 8 })
    storeId!: string;

    @ManyToOne(() => Store, (store) => store.products, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'store_id' })
    store!: Store;

    @Column({ name: 'product_variant_id', type: 'varchar', length: 8 })
    productVariantId!: string;

    @ManyToOne(() => ProductVariant, (variant) => variant.storeProducts, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'product_variant_id' })
    productVariant!: ProductVariant;

    @Column({ name: 'external_product_id', type: 'varchar', length: 255, nullable: true })
    externalProductId!: string | null;

    @Column({ name: 'external_url', type: 'varchar', length: 2048 })
    externalUrl!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    title!: string | null;

    @Column({ type: 'text', nullable: true })
    description!: string | null;

    @Column({
        name: 'availability_status',
        type: 'varchar',
        length: 16,
        default: AvailabilityStatus.AVAILABLE,
    })
    availabilityStatus!: AvailabilityStatus;

    @Column({ name: 'stock_status', type: 'varchar', length: 16, default: StockStatus.UNKNOWN })
    stockStatus!: StockStatus;

    @Column({ name: 'last_checked_at', type: 'timestamptz', nullable: true })
    lastCheckedAt!: Date | null;

    @Column({ name: 'is_active', default: true })
    isActive!: boolean;

    @OneToOne(() => Price, (price) => price.storeProduct)
    price!: Price;

    @OneToMany(() => PriceHistory, (history) => history.storeProduct)
    priceHistory!: PriceHistory[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
