import { CartItemResponseDto } from './cart-item.response.dto';
import { CartStatus } from '../enums/cart-status.enum';
import { User } from '../../users/entities/user.entity';
export declare class CartResponseDto {
    id: string;
    userId: string;
    status: CartStatus;
    expiresAt: Date;
    items: CartItemResponseDto[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
    get totalItems(): number;
    get totalPrice(): number;
}
