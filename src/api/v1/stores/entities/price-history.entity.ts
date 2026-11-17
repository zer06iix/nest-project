import { Check, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { StoreProduct } from './store-product.entity';

@Entity('price_history')
@Index('IDX_price_history_listing_recorded', ['storeProductId', 'recordedAt'])
@Check('CHK_price_history_amount_nonnegative', '"amount" >= 0')
@Check(
    'CHK_price_history_original_amount_nonnegative',
    '"original_amount" IS NULL OR "original_amount" >= 0',
)
export class PriceHistory extends Nanoid8Entity {
    @Column({ name: 'store_product_id', type: 'varchar', length: 8 })
    storeProductId!: string;

    @ManyToOne(() => StoreProduct, (storeProduct) => storeProduct.priceHistory, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'store_product_id' })
    storeProduct!: StoreProduct;

    @Column({ type: 'bigint' })
    amount!: string;

    @Column({ name: 'original_amount', type: 'bigint', nullable: true })
    originalAmount!: string | null;

    @Column({ type: 'varchar', length: 3, default: 'IRR' })
    currency!: string;

    @Column({ name: 'recorded_at', type: 'timestamptz', default: () => 'now()' })
    recordedAt!: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
