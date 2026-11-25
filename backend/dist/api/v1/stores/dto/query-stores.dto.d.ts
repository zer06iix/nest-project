import { StoreStatus } from '../enums/store-status.enum';
export declare class QueryStoresDto {
    page: number;
    limit: number;
    search?: string;
    status?: StoreStatus;
}
