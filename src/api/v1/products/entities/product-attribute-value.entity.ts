import {
    Check,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';
import { Attribute } from '../../attributes/entities/attribute.entity';
import { AttributeOption } from '../../attributes/entities/attribute-option.entity';

@Entity('product_attribute_values')
@Index('uq_product_attribute_value', ['productId', 'attributeId'], {
    unique: true,
})
@Check(
    'CHK_product_attribute_value_one_value',
    `(("option_id" IS NOT NULL)::int + ("value_text" IS NOT NULL)::int + ("value_number" IS NOT NULL)::int + ("value_boolean" IS NOT NULL)::int + ("value_date" IS NOT NULL)::int) = 1`,
)
export class ProductAttributeValue extends Nanoid8Entity {
    @Column({ name: 'product_id', type: 'varchar', length: 8 })
    productId!: string;

    @ManyToOne(() => Product, (product) => product.attributeValues, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({ name: 'attribute_id', type: 'varchar', length: 36 })
    attributeId!: string;

    @ManyToOne(() => Attribute, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'attribute_id' })
    attribute!: Attribute;

    @Column({ name: 'option_id', type: 'varchar', length: 36, nullable: true })
    optionId!: string | null;

    @ManyToOne(() => AttributeOption, { nullable: true, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'option_id' })
    option!: AttributeOption | null;

    @Column({ name: 'value_text', type: 'text', nullable: true })
    valueText!: string | null;

    @Column({
        name: 'value_number',
        type: 'numeric',
        precision: 20,
        scale: 6,
        nullable: true,
    })
    valueNumber!: string | null;

    @Column({ name: 'value_boolean', type: 'boolean', nullable: true })
    valueBoolean!: boolean | null;

    @Column({ name: 'value_date', type: 'date', nullable: true })
    valueDate!: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
