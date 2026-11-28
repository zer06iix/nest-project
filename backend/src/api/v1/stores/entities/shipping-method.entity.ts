import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Store } from './store.entity';

@Entity('shipping_methods')
@Check('CHK_shipping_methods_cost_non_negative', '"cost" >= 0')
@Index('IDX_shipping_methods_store_active', ['storeId', 'isActive'])
export class ShippingMethod extends Nanoid8Entity {
  @Column({ name: 'store_id', type: 'varchar', length: 8 })
  storeId!: string;

  @ManyToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store!: Store;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'numeric', precision: 20, scale: 6, default: '0' })
  cost!: string;

  @Column({ type: 'varchar', length: 3, default: 'IRR' })
  currency!: string;

  @Column({ name: 'estimated_delivery_days', type: 'integer', nullable: true })
  estimatedDeliveryDays!: number | null;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({
    name: 'min_order_amount',
    type: 'numeric',
    precision: 20,
    scale: 6,
    nullable: true,
  })
  minOrderAmount!: string | null;

  @Column({
    name: 'max_order_amount',
    type: 'numeric',
    precision: 20,
    scale: 6,
    nullable: true,
  })
  maxOrderAmount!: string | null;

  @Column({ name: 'conditions', type: 'jsonb', nullable: true })
  conditions!: Record<string, unknown> | null;

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}