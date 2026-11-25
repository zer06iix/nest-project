import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';
import { ProductIdentifierType } from '../enums/product-identifier-type.enum';
export declare class ProductIdentifier extends Nanoid8Entity {
    productId: string;
    product: Product;
    type: ProductIdentifierType;
    value: string;
    createdAt: Date;
}
