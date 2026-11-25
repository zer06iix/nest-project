import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';
import { ProductIdentifierType } from '../enums/product-identifier-type.enum';

@Entity('product_identifiers')
@Index('uq_product_identifier_type_value', ['type', 'value'], { unique: true })
@Index('IDX_product_identifiers_product', ['productId'])
export class ProductIdentifier extends Nanoid8Entity {
    @Column({ name: 'product_id', type: 'varchar', length: 8 })
    productId!: string;

    @ManyToOne(() => Product, (product) => product.identifiers, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({ type: 'varchar', length: 8 })
    type!: ProductIdentifierType;

    @Column({ type: 'varchar', length: 100 })
    value!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
