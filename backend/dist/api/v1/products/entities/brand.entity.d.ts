import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { Product } from './product.entity';
export declare class Brand extends Nanoid8Entity {
    name: string;
    slug: string;
    logo: string | null;
    description: string | null;
    isActive: boolean;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
