import { CategoryAttribute } from '../../attributes/entities/category-attribute.entity';
import { NanoidEntity } from '../../common/entities/nanoid.entity';
export declare class Category extends NanoidEntity {
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    isActive: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    parentId: string | null;
    parent: Category | null;
    children: Category[];
    categoryAttributes: CategoryAttribute[];
    createdAt: Date;
    updatedAt: Date;
}
