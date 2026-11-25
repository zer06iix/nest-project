import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartResponseDto } from './dto/cart.response.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    private toResponse;
    private getUserId;
    private getSessionId;
    create(req: any, headerSessionId: string | undefined, dto: CreateCartDto): Promise<CartResponseDto>;
    findMyCart(req: any, headerSessionId: string | undefined): Promise<CartResponseDto>;
    addItem(req: any, headerSessionId: string | undefined, dto: AddCartItemDto): Promise<CartResponseDto>;
    updateItem(req: any, headerSessionId: string | undefined, itemId: string, dto: UpdateCartItemDto): Promise<CartResponseDto>;
    removeItem(req: any, headerSessionId: string | undefined, itemId: string): Promise<CartResponseDto>;
    clear(req: any, headerSessionId: string | undefined): Promise<void>;
    convert(req: any, headerSessionId: string | undefined): Promise<CartResponseDto>;
    abandon(req: any, headerSessionId: string | undefined): Promise<CartResponseDto>;
    mergeGuestCart(req: any, headerSessionId: string | undefined): Promise<CartResponseDto>;
}
