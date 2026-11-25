import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Req,
    HttpCode,
    HttpStatus,
    Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiCookieAuth, ApiHeader } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartResponseDto } from './dto/cart.response.dto';
import { Cart } from './entities/cart.entity';

const CART_SESSION_COOKIE = 'cart_session_id';
const CART_SESSION_HEADER = 'x-cart-session-id';

@ApiTags('سبد خرید')
@ApiBearerAuth()
@ApiCookieAuth(CART_SESSION_COOKIE)
@ApiHeader({
    name: CART_SESSION_HEADER,
    required: false,
    description: 'شناسه نشست سبد خرید برای کاربران مهمان',
})
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    private toResponse(cart: Cart): CartResponseDto {
        return plainToInstance(CartResponseDto, cart, {
            excludeExtraneousValues: true,
        });
    }

    private getUserId(req: any): string | undefined {
        return req.user?.id;
    }

    private getSessionId(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
    ): string | undefined {
        const cookieSessionId = req.cookies?.[CART_SESSION_COOKIE];
        return cookieSessionId || headerSessionId;
    }

    @Post()
    @ApiOperation({ summary: 'ایجاد یا دریافت سبد خرید فعال برای کاربر جاری' })
    async create(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
        @Body() dto: CreateCartDto,
    ): Promise<CartResponseDto> {
        const userId = this.getUserId(req) || dto.userId;
        const sessionId = dto.sessionId || this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.create({ userId, sessionId });
        return this.toResponse(cart);
    }

    @Get()
    @ApiOperation({ summary: 'دریافت سبد خرید فعال کاربر جاری' })
    async findMyCart(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
    ): Promise<CartResponseDto> {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.getOrCreateCart(userId, sessionId);
        return this.toResponse(cart);
    }

    @Post('items')
    @ApiOperation({ summary: 'افزودن آیتم به سبد خرید' })
    async addItem(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
        @Body() dto: AddCartItemDto,
    ): Promise<CartResponseDto> {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.addItem(userId, sessionId, dto);
        return this.toResponse(cart);
    }

    @Put('items/:itemId')
    @ApiOperation({ summary: 'به‌روزرسانی تعداد آیتم سبد خرید' })
    async updateItem(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
        @Param('itemId') itemId: string,
        @Body() dto: UpdateCartItemDto,
    ): Promise<CartResponseDto> {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.updateItem(userId, sessionId, itemId, dto);
        return this.toResponse(cart);
    }

    @Delete('items/:itemId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'حذف آیتم از سبد خرید' })
    async removeItem(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
        @Param('itemId') itemId: string,
    ): Promise<CartResponseDto> {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.removeItem(userId, sessionId, itemId);
        return this.toResponse(cart);
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'خالی کردن سبد خرید' })
    async clear(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
    ): Promise<void> {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        return this.cartService.clear(userId, sessionId);
    }

    @Post('convert')
    @ApiOperation({ summary: 'تبدیل سبد خرید به سفارش' })
    async convert(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
    ): Promise<CartResponseDto> {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.convertToOrder(userId, sessionId);
        return this.toResponse(cart);
    }

    @Post('abandon')
    @ApiOperation({ summary: 'رها کردن سبد خرید' })
    async abandon(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
    ): Promise<CartResponseDto> {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.abandon(userId, sessionId);
        return this.toResponse(cart);
    }

    @Post('merge')
    @ApiOperation({ summary: 'ادغام سبد خرید مهمان به سبد کاربر لاگین شده' })
    @ApiBearerAuth()
    async mergeGuestCart(
        @Req() req: any,
        @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
    ): Promise<CartResponseDto> {
        const userId = this.getUserId(req);
        if (!userId) {
            throw new Error('User must be authenticated to merge cart');
        }
        const sessionId = this.getSessionId(req, headerSessionId);
        if (!sessionId) {
            throw new Error('No guest cart session found');
        }
        const cart = await this.cartService.mergeGuestCartToUser(sessionId, userId);
        return this.toResponse(cart);
    }
}
