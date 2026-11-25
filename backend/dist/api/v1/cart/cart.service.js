"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const cart_status_enum_1 = require("./enums/cart-status.enum");
let CartService = class CartService {
    cartRepository;
    cartItemRepository;
    constructor(cartRepository, cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }
    async create(dto) {
        const { userId, sessionId } = dto;
        if (!userId && !sessionId) {
            throw new Error('Either userId or sessionId must be provided');
        }
        const whereCondition = userId
            ? { userId, status: cart_status_enum_1.CartStatus.ACTIVE }
            : { sessionId, status: cart_status_enum_1.CartStatus.ACTIVE };
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
            status: cart_status_enum_1.CartStatus.ACTIVE,
            expiresAt,
        });
        return this.cartRepository.save(cart);
    }
    async findByUserId(userId) {
        return this.cartRepository.findOne({
            where: { userId, status: cart_status_enum_1.CartStatus.ACTIVE },
            relations: { items: { storeProduct: { price: true } } },
        });
    }
    async findBySessionId(sessionId) {
        return this.cartRepository.findOne({
            where: { sessionId, status: cart_status_enum_1.CartStatus.ACTIVE },
            relations: { items: { storeProduct: { price: true } } },
        });
    }
    async findById(id) {
        return this.cartRepository.findOne({
            where: { id },
            relations: { items: { storeProduct: { price: true } } },
        });
    }
    async getOrCreateCart(userId, sessionId) {
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
    async addItem(userId, sessionId, dto) {
        const cart = await this.getOrCreateCart(userId, sessionId);
        const existingItem = cart.items.find((item) => item.storeProductId === dto.storeProductId);
        if (existingItem) {
            existingItem.quantity += dto.quantity;
            await this.cartItemRepository.save(existingItem);
        }
        else {
            const cartItem = this.cartItemRepository.create({
                cartId: cart.id,
                storeProductId: dto.storeProductId,
                quantity: dto.quantity,
            });
            await this.cartItemRepository.save(cartItem);
        }
        const updatedCart = await this.findById(cart.id);
        if (!updatedCart) {
            throw new common_1.NotFoundException('Cart not found after update');
        }
        return updatedCart;
    }
    async updateItem(userId, sessionId, itemId, dto) {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        const item = cart.items.find((i) => i.id === itemId);
        if (!item) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        item.quantity = dto.quantity;
        await this.cartItemRepository.save(item);
        const updatedCart = await this.findById(cart.id);
        if (!updatedCart) {
            throw new common_1.NotFoundException('Cart not found after update');
        }
        return updatedCart;
    }
    async removeItem(userId, sessionId, itemId) {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        const item = cart.items.find((i) => i.id === itemId);
        if (!item) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        await this.cartItemRepository.remove(item);
        const updatedCart = await this.findById(cart.id);
        if (!updatedCart) {
            throw new common_1.NotFoundException('Cart not found after update');
        }
        return updatedCart;
    }
    async clear(userId, sessionId) {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (cart) {
            await this.cartItemRepository.delete({ cartId: cart.id });
        }
    }
    async convertToOrder(userId, sessionId) {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.status = cart_status_enum_1.CartStatus.CONVERTED;
        return this.cartRepository.save(cart);
    }
    async abandon(userId, sessionId) {
        const cart = await this.getOrCreateCart(userId, sessionId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.status = cart_status_enum_1.CartStatus.ABANDONED;
        return this.cartRepository.save(cart);
    }
    async mergeGuestCartToUser(sessionId, userId) {
        const guestCart = await this.findBySessionId(sessionId);
        if (!guestCart) {
            return this.getOrCreateCart(userId, undefined);
        }
        const userCart = await this.getOrCreateCart(userId, undefined);
        for (const guestItem of guestCart.items) {
            const existingItem = userCart.items.find((item) => item.storeProductId === guestItem.storeProductId);
            if (existingItem) {
                existingItem.quantity += guestItem.quantity;
                await this.cartItemRepository.save(existingItem);
            }
            else {
                const cartItem = this.cartItemRepository.create({
                    cartId: userCart.id,
                    storeProductId: guestItem.storeProductId,
                    quantity: guestItem.quantity,
                });
                await this.cartItemRepository.save(cartItem);
            }
        }
        await this.cartItemRepository.delete({ cartId: guestCart.id });
        guestCart.status = cart_status_enum_1.CartStatus.CONVERTED;
        await this.cartRepository.save(guestCart);
        const mergedCart = await this.findById(userCart.id);
        if (!mergedCart) {
            throw new common_1.NotFoundException('Merged cart not found');
        }
        return mergedCart;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map