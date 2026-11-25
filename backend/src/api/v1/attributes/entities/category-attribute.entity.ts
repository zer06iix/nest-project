import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
} from 'typeorm';
import { Attribute } from './attribute.entity';
import { Category } from '../../categories/entities/category.entity';
import { AttributeDisplayType } from '../enums/attribute-display-type.enum';
import { NanoidEntity } from '../../common/entities/nanoid.entity';

@Entity('category_attribute')
@Index('uq_category_attribute_category_attribute', ['categoryId', 'attributeId'], { unique: true })
export class CategoryAttribute extends NanoidEntity {
    @Column({ name: 'is_required', default: false })
    isRequired!: boolean;

    @Column({ name: 'is_filterable', default: false })
    isFilterable!: boolean;

    @Column({ name: 'is_visible_on_card', default: true })
    isVisibleOnCard!: boolean;

    @Column({ name: 'is_visible_on_product', default: true })
    isVisibleOnProduct!: boolean;

    @Column({ name: 'is_variant_attribute', default: false })
    isVariantAttribute!: boolean;

    @Column({ name: 'display_type', default: 'SELECT' })
    displayType!: AttributeDisplayType;

    @Column({ name: 'sort_order', default: 0 })
    sortOrder!: number;

    @Column({ name: 'category_id', type: 'varchar', length: 36 })
    categoryId!: string;

    @ManyToOne(() => Category, (category) => category.categoryAttributes)
    @JoinColumn({ name: 'category_id' })
    category!: Category;

    @Column({ name: 'attribute_id', type: 'varchar', length: 36 })
    attributeId!: string;

    @ManyToOne(() => Attribute, (attribute) => attribute.categoryAttributes)
    @JoinColumn({ name: 'attribute_id' })
    attribute!: Attribute;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
