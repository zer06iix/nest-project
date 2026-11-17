import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { StoreStatus } from '../enums/store-status.enum';
import { StoreProduct } from './store-product.entity';

@Entity('stores')
@Index('uq_stores_slug', ['slug'], { unique: true })
@Index('IDX_stores_status_name', ['status', 'name'])
export class Store extends Nanoid8Entity {
    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    slug!: string;

    @Column({ type: 'text', nullable: true })
    description!: string | null;

    @Column({ type: 'varchar', length: 500, nullable: true })
    logo!: string | null;

    @Column({ type: 'varchar', length: 500, nullable: true })
    website!: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email!: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true })
    phone!: string | null;

    @Column({ type: 'varchar', length: 16, default: StoreStatus.PENDING })
    status!: StoreStatus;

    @OneToMany(() => StoreProduct, (listing) => listing.store)
    products!: StoreProduct[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

}
