import { Column, CreateDateColumn, Entity, Index, OneToMany, UpdateDateColumn } from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';

@Entity('brands')
@Index('uq_brands_slug', ['slug'], { unique: true })
export class Brand extends Nanoid8Entity {
    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    slug!: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    logo!: string | null;

    @Column({ type: 'text', nullable: true })
    description!: string | null;

    @Column({ name: 'is_active', default: true })
    isActive!: boolean;

    @OneToMany(() => Product, (product) => product.brand)
    products!: Product[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
