import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartService {
    private readonly cartRepository;
    private readonly cartItemRepository;
    constructor(cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>);
    create(dto: CreateCartDto): Promise<Cart>;
    findByUserId(userId: string): Promise<Cart | null>;
    findBySessionId(sessionId: string): Promise<Cart | null>;
    findById(id: string): Promise<Cart | null>;
    getOrCreateCart(userId: string | undefined, sessionId: string | undefined): Promise<Cart>;
    addItem(userId: string | undefined, sessionId: string | undefined, dto: AddCartItemDto): Promise<Cart>;
    updateItem(userId: string | undefined, sessionId: string | undefined, itemId: string, dto: UpdateCartItemDto): Promise<Cart>;
    removeItem(userId: string | undefined, sessionId: string | undefined, itemId: string): Promise<Cart>;
    clear(userId: string | undefined, sessionId: string | undefined): Promise<void>;
    convertToOrder(userId: string | undefined, sessionId: string | undefined): Promise<Cart>;
    abandon(userId: string | undefined, sessionId: string | undefined): Promise<Cart>;
    mergeGuestCartToUser(sessionId: string, userId: string): Promise<Cart>;
}
