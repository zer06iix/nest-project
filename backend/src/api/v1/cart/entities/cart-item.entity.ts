import { Nanoid8Entity } from 'api/v1/common/entities/nanoid-8.entity';
import { StoreProduct } from 'api/v1/stores/entities/store-product.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_item')
export class CartItem extends Nanoid8Entity {
    @Column({ name: 'cart_id', type: 'varchar', length: 8 })
    cartId!: string;

    @ManyToOne(() => Cart, (cart) => cart.items)
    @JoinColumn({ name: 'cart_id' })
    cart!: Cart;

    @Column({ name: 'store_product_id', type: 'varchar', length: 8 })
    storeProductId!: string;

    @ManyToOne(() => StoreProduct)
    @JoinColumn({ name: 'store_product_id' })
    storeProduct!: StoreProduct;

    @Column({ name: 'quantity', type: 'integer' })
    quantity!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
