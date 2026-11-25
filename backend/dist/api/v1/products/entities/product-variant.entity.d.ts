import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';
import { VariantAttributeValue } from './variant-attribute-value.entity';
import { StoreProduct } from '../../stores/entities/store-product.entity';
export declare class ProductVariant extends Nanoid8Entity {
    productId: string;
    product: Product;
    title: string;
    sku: string | null;
    isDefault: boolean;
    isActive: boolean;
    sortOrder: number;
    attributeValues: VariantAttributeValue[];
    storeProducts: StoreProduct[];
    createdAt: Date;
    updatedAt: Date;
}
