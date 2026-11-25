import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { StoreStatus } from '../enums/store-status.enum';
import { StoreProduct } from './store-product.entity';
export declare class Store extends Nanoid8Entity {
    name: string;
    slug: string;
    description: string | null;
    logo: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    status: StoreStatus;
    products: StoreProduct[];
    createdAt: Date;
    updatedAt: Date;
}
