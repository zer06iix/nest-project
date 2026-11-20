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
import { ProductVariant } from './product-variant.entity';
import { Attribute } from '../../attributes/entities/attribute.entity';
import { AttributeOption } from '../../attributes/entities/attribute-option.entity';

@Entity('variant_attribute_values')
@Index('uq_variant_attribute_value', ['variantId', 'attributeId'], {
    unique: true,
})
@Check(
    'CHK_variant_attribute_value_one_value',
    `(("option_id" IS NOT NULL)::int + ("value_text" IS NOT NULL)::int + ("value_number" IS NOT NULL)::int + ("value_boolean" IS NOT NULL)::int + ("value_date" IS NOT NULL)::int) = 1`,
)
export class VariantAttributeValue extends Nanoid8Entity {
    @Column({ name: 'variant_id', type: 'varchar', length: 8 })
    variantId!: string;

    @ManyToOne(() => ProductVariant, (variant) => variant.attributeValues, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'variant_id' })
    variant!: ProductVariant;

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
