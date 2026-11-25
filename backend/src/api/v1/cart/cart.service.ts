import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartStatus } from './enums/cart-status.enum';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
    ) {}

    async create(dto: CreateCartDto): Promise<Cart> {
        const { userId, sessionId } = dto;

        if (!userId && !sessionId) {
            throw new Error('Either userId or sessionId must be provided');
        }

        const whereCondition = userId
            ? { userId, status: CartStatus.ACTIVE }
            : { sessionId, status: CartStatus.ACTIVE };

        const existingCart = await this.cartRepository.findOne({
            where: whereCondition,
        });

        if (existingCart) {
            return existingCart;
        }

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const cart = this.cartRepository.create({
            userId: userId || null,
            sessionId: sessionId || null,
            status: CartStatus.ACTIVE,
            expiresAt,
        });

        return this.cartRepository.save(cart);
    }

    async findByUserId(userId: string): Promise<Cart | null> {
        return this.cartRepository.findOne({
            where: { userId, status: CartStatus.ACTIVE },
            relations: { items: { storeProduct: { price: true } } },
        });
    }

    async findBySessionId(sessionId: string): Promise<Cart | null> {
        return this.cartRepository.findOne({
            where: { sessionId, status: CartStatus.ACTIVE },
            relations: { items: { storeProduct: { price: true } } },
        });
    }

    async findById(id: string): Promise<Cart | null> {
        return this.cartRepository.findOne({
            where: { id },
            relations: { items: { storeProduct: { price: true } } },
        });
    }

    async getOrCreateCart(
        userId: string | undefined,
        sessionId: string | undefined,
    ): Promise<Cart> {
        if (userId) {
            let cart = await this.findByUserId(userId);
            if (!cart) {
                cart = await this.create({ userId });
            }
            return cart;
        }

        if (sessionId) {
            let cart = await this.findBySessionId(sessionId);
            if (!cart) {
                cart = await this.create({ sessionId });
            }
            return cart;
        }

        throw new Error('Either userId or sessionId must be provided');
    }

    async addItem(
        userId: string | undefined,
        sessionId: string | undefined,
        dto: AddCartItemDto,
    ): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, sessionId);

        const existingItem = cart.items.find((item) => item.storeProductId === dto.storeProductId);

        if (existingItem) {
            existingItem.quantity += dto.quantity;
            await this.cartItemRepository.save(existingItem);
        } else {
            const cartItem = this.cartItemRepository.create({
                cartId: cart.id,
                storeProductId: dto.storeProductId,
                quantity: dto.quantity,
            });
            await this.cartItemRepository.save(cartItem);
        }

        const updatedCart = await this.findById(cart.id);
        if (!updatedCart) {
            throw new NotFoundException('Cart not found after update');
        }
        return updatedCart;
    }

    async updateItem(
        userId: string | undefined,
        sessionId: string | undefined,
        itemId: string,
        dto: UpdateCartItemDto,
    ): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const item = cart.items.find((i) => i.id === itemId);
        if (!item) {
            throw new NotFoundException('Cart item not found');
        }

        item.quantity = dto.quantity;
        await this.cartItemRepository.save(item);

        const updatedCart = await this.findById(cart.id);
        if (!updatedCart) {
            throw new NotFoundException('Cart not found after update');
        }
        return updatedCart;
    }

    async removeItem(
        userId: string | undefined,
        sessionId: string | undefined,
        itemId: string,
    ): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const item = cart.items.find((i) => i.id === itemId);
        if (!item) {
            throw new NotFoundException('Cart item not found');
        }

        await this.cartItemRepository.remove(item);

        const updatedCart = await this.findById(cart.id);
        if (!updatedCart) {
            throw new NotFoundException('Cart not found after update');
        }
        return updatedCart;
    }

    async clear(userId: string | undefined, sessionId: string | undefined): Promise<void> {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (cart) {
            await this.cartItemRepository.delete({ cartId: cart.id });
        }
    }

    async convertToOrder(userId: string | undefined, sessionId: string | undefined): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        cart.status = CartStatus.CONVERTED;
        return this.cartRepository.save(cart);
    }

    async abandon(userId: string | undefined, sessionId: string | undefined): Promise<Cart> {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        cart.status = CartStatus.ABANDONED;
        return this.cartRepository.save(cart);
    }

    async mergeGuestCartToUser(sessionId: string, userId: string): Promise<Cart> {
        const guestCart = await this.findBySessionId(sessionId);
        if (!guestCart) {
            return this.getOrCreateCart(userId, undefined);
        }

        const userCart = await this.getOrCreateCart(userId, undefined);

        for (const guestItem of guestCart.items) {
            const existingItem = userCart.items.find(
                (item) => item.storeProductId === guestItem.storeProductId,
            );

            if (existingItem) {
                existingItem.quantity += guestItem.quantity;
                await this.cartItemRepository.save(existingItem);
            } else {
                const cartItem = this.cartItemRepository.create({
                    cartId: userCart.id,
                    storeProductId: guestItem.storeProductId,
                    quantity: guestItem.quantity,
                });
                await this.cartItemRepository.save(cartItem);
            }
        }

        await this.cartItemRepository.delete({ cartId: guestCart.id });
        guestCart.status = CartStatus.CONVERTED;
        await this.cartRepository.save(guestCart);

        const mergedCart = await this.findById(userCart.id);
        if (!mergedCart) {
            throw new NotFoundException('Merged cart not found');
        }
        return mergedCart;
    }
}
