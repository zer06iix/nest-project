import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';
import { StoreProductStatus } from '../enums/store-product-status.enum';
export declare class CreateStoreProductDto {
    storeId?: string;
    productVariantId: string;
    externalUrl?: string | null;
    currentPrice: string;
    originalPrice?: string | null;
    currency?: string;
    externalProductId?: string | null;
    title?: string | null;
    description?: string | null;
    availabilityStatus?: AvailabilityStatus;
    stockStatus?: StockStatus;
    isActive?: boolean;
    stockQuantity?: number | null;
    status?: StoreProductStatus;
}
