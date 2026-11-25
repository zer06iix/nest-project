import { Nanoid8Entity } from "../../common/entities/nanoid-8.entity.js";
import { User } from "../../users/entities/user.entity.js";
import { CartItem } from './cart-item.entity';
import { CartStatus } from '../enums/cart-status.enum';
export declare class Cart extends Nanoid8Entity {
    userId: string | null;
    user: User | null;
    sessionId: string | null;
    status: CartStatus;
    expiresAt: Date;
    items: CartItem[];
    createdAt: Date;
    updatedAt: Date;
}
