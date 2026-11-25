import { ProductStatus } from '../enums/product-status.enum';
import { AvailabilityStatus } from '../../stores/enums/availability-status.enum';
import { StockStatus } from '../../stores/enums/stock-status.enum';
export declare enum ProductSort {
    CREATED_AT = "createdAt",
    NAME = "name",
    PRICE = "price"
}
export declare class QueryProductsDto {
    page: number;
    limit: number;
    search?: string;
    categoryId?: string;
    brandId?: string;
    storeId?: string;
    status?: ProductStatus;
    availabilityStatus?: AvailabilityStatus;
    stockStatus?: StockStatus;
    minPrice?: number;
    maxPrice?: number;
    attributeId?: string;
    attributeValue?: string;
    sortBy: ProductSort;
    sortOrder: 'ASC' | 'DESC';
}
