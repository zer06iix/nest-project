import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Store } from './store.entity';
import { ProductVariant } from '../../products/entities/product-variant.entity';
import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';
import { Price } from './price.entity';
import { PriceHistory } from './price-history.entity';
import { StoreProductStatus } from '../enums/store-product-status.enum';
export declare class StoreProduct extends Nanoid8Entity {
    storeId: string;
    store: Store;
    productVariantId: string;
    productVariant: ProductVariant;
    externalProductId: string | null;
    externalUrl: string | null;
    title: string | null;
    description: string | null;
    availabilityStatus: AvailabilityStatus;
    stockStatus: StockStatus;
    stockQuantity: number | null;
    status: StoreProductStatus;
    lastCheckedAt: Date | null;
    isActive: boolean;
    price: Price;
    priceHistory: PriceHistory[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
