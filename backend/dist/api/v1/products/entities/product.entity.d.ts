import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Category } from '../../categories/entities/category.entity';
import { ProductStatus } from '../enums/product-status.enum';
import { Brand } from './brand.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductImage } from './product-image.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';
import { ProductIdentifier } from './product-identifier.entity';
export declare class Product extends Nanoid8Entity {
    name: string;
    slug: string;
    description: string | null;
    categoryId: string;
    category: Category;
    brandId: string | null;
    brand: Brand | null;
    status: ProductStatus;
    variants: ProductVariant[];
    images: ProductImage[];
    attributeValues: ProductAttributeValue[];
    identifiers: ProductIdentifier[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
