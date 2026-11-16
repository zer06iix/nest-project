import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { CategoryAttribute } from './category-attribute.entity';
import { AttributeOption } from './attribute-option.entity';
import { AttributeDataType } from '../enums/attribute-datatype.enum';
import { NanoidEntity } from '../../common/entities/nanoid.entity';


@Entity('attributes')
@Index('uq_attributes_slug', ['slug'], { unique: true })
export class Attribute extends NanoidEntity {
    @Column({ nullable: false, length: 120 })
    name!: string;

    @Column({ nullable: false, length: 140 })
    slug!: string;

    @Column({ name: 'data_type', type: 'varchar', length: 20 })
    dataType!: AttributeDataType;

    @Column({ type: 'varchar', nullable: true, length: 40 })
    unit!: string | null;

    @Column({ type: 'text', nullable: true })
    description!: string | null;

    @Column({ name: 'is_active', default: true })
    isActive!: boolean;

    @OneToMany(() => AttributeOption, (option) => option.attribute)
    options!: AttributeOption[];

    @OneToMany(() => CategoryAttribute, (categoryAttribute) => categoryAttribute.attribute)
    categoryAttributes!: CategoryAttribute[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
