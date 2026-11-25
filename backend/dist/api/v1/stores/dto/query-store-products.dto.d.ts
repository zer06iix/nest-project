import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';
import { StoreProductStatus } from '../enums/store-product-status.enum';
export declare class QueryStoreProductsDto {
    page: number;
    limit: number;
    search?: string;
    storeId?: string;
    productId?: string;
    productVariantId?: string;
    availabilityStatus?: AvailabilityStatus;
    stockStatus?: StockStatus;
    status?: StoreProductStatus;
    minPrice?: string;
    maxPrice?: string;
}
