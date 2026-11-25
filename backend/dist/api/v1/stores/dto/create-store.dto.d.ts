import { StoreStatus } from '../enums/store-status.enum';
export declare class CreateStoreDto {
    name: string;
    slug: string;
    description?: string | null;
    logo?: string | null;
    website?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: StoreStatus;
}
