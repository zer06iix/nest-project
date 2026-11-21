import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm';
import { Nanoid8Entity } from 'api/v1/common/entities/nanoid-8.entity';
import { User } from 'api/v1/users/entities/user.entity';
import { CartItem } from './cart-item.entity';
import { CartStatus } from '../enums/cart-status.enum';


@Entity('cart')
export class Cart extends Nanoid8Entity {
    @Column({ name: 'user_id', type: 'varchar', length: 8, nullable: true })
    userId!: string | null;

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User | null;

    @Column({ name: 'session_id', type: 'varchar', length: 64, nullable: true })
    sessionId!: string | null;

    @Column({ default: CartStatus.ACTIVE })
    status!: CartStatus;

    @Column({ name: 'expires_at' })
    expiresAt!: Date;

    @OneToMany(() => CartItem, item => item.cart)
    items!: CartItem[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

}
