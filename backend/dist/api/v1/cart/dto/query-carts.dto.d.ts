import { CartStatus } from '../enums/cart-status.enum';
export declare class QueryCartsDto {
    userId?: string;
    status?: CartStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
