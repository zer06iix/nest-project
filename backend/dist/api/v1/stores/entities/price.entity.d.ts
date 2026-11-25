import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { StoreProduct } from './store-product.entity';
export declare class Price extends Nanoid8Entity {
    storeProductId: string;
    storeProduct: StoreProduct;
    amount: string;
    originalAmount: string | null;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}
