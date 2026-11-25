import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';
export declare class ProductImage extends Nanoid8Entity {
    productId: string;
    product: Product;
    url: string;
    altText: string | null;
    isPrimary: boolean;
    sortOrder: number;
    createdAt: Date;
}
