import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { CategoryAttribute } from '../../attributes/entities/category-attribute.entity';
import { NanoidEntity } from '../../common/entities/nanoid.entity';

@Entity('categories')
@Index('uq_categories_slug', ['slug'], { unique: true })
export class Category extends NanoidEntity {
    @Column({ length: 120 })
    name!: string;

    @Column({ length: 140 })
    slug!: string;

    @Column({ type: 'text', nullable: true })
    description!: string | null;

    @Column({ name: 'image_url', type: 'text', nullable: true })
    imageUrl!: string | null;

    @Column({ name: 'is_active', default: true })
    isActive!: boolean;

    @Column({ name: 'seo_title', type: 'varchar', length: 160, nullable: true })
    seoTitle!: string | null;

    @Column({
        name: 'seo_description',
        type: 'varchar',
        length: 320,
        nullable: true,
    })
    seoDescription!: string | null;

    @Column({ name: 'parent_id', type: 'varchar', length: 36, nullable: true })
    parentId!: string | null;

    @ManyToOne(() => Category, (category) => category.children, {
        nullable: true,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'parent_id' })
    parent!: Category | null;

    @OneToMany(() => Category, (category) => category.parent)
    children!: Category[];

    @OneToMany(() => CategoryAttribute, (categoryAttribute) => categoryAttribute.category)
    categoryAttributes!: CategoryAttribute[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
