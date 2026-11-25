import { AvailabilityStatus } from '../enums/availability-status.enum';
import { StockStatus } from '../enums/stock-status.enum';
import { StoreProductStatus } from '../enums/store-product-status.enum';
export declare class UpdateStoreProductDto {
    externalUrl?: string;
    externalProductId?: string | null;
    title?: string | null;
    description?: string | null;
    availabilityStatus?: AvailabilityStatus;
    stockStatus?: StockStatus;
    isActive?: boolean;
    stockQuantity?: number | null;
    status?: StoreProductStatus;
}
