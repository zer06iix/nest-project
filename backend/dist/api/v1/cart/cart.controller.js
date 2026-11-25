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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const cart_service_1 = require("./cart.service");
const create_cart_dto_1 = require("./dto/create-cart.dto");
const add_cart_item_dto_1 = require("./dto/add-cart-item.dto");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
const cart_response_dto_1 = require("./dto/cart.response.dto");
const CART_SESSION_COOKIE = 'cart_session_id';
const CART_SESSION_HEADER = 'x-cart-session-id';
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    toResponse(cart) {
        return (0, class_transformer_1.plainToInstance)(cart_response_dto_1.CartResponseDto, cart, {
            excludeExtraneousValues: true,
        });
    }
    getUserId(req) {
        return req.user?.id;
    }
    getSessionId(req, headerSessionId) {
        const cookieSessionId = req.cookies?.[CART_SESSION_COOKIE];
        return cookieSessionId || headerSessionId;
    }
    async create(req, headerSessionId, dto) {
        const userId = this.getUserId(req) || dto.userId;
        const sessionId = dto.sessionId || this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.create({ userId, sessionId });
        return this.toResponse(cart);
    }
    async findMyCart(req, headerSessionId) {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.getOrCreateCart(userId, sessionId);
        return this.toResponse(cart);
    }
    async addItem(req, headerSessionId, dto) {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.addItem(userId, sessionId, dto);
        return this.toResponse(cart);
    }
    async updateItem(req, headerSessionId, itemId, dto) {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.updateItem(userId, sessionId, itemId, dto);
        return this.toResponse(cart);
    }
    async removeItem(req, headerSessionId, itemId) {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.removeItem(userId, sessionId, itemId);
        return this.toResponse(cart);
    }
    async clear(req, headerSessionId) {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        return this.cartService.clear(userId, sessionId);
    }
    async convert(req, headerSessionId) {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.convertToOrder(userId, sessionId);
        return this.toResponse(cart);
    }
    async abandon(req, headerSessionId) {
        const userId = this.getUserId(req);
        const sessionId = this.getSessionId(req, headerSessionId);
        const cart = await this.cartService.abandon(userId, sessionId);
        return this.toResponse(cart);
    }
    async mergeGuestCart(req, headerSessionId) {
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
};
exports.CartController = CartController;
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], CartController.prototype, "getSessionId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'ایجاد یا دریافت سبد خرید فعال برای کاربر جاری' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_cart_dto_1.CreateCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت سبد خرید فعال کاربر جاری' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "findMyCart", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'افزودن آیتم به سبد خرید' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, add_cart_item_dto_1.AddCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Put)('items/:itemId'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی تعداد آیتم سبد خرید' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __param(2, (0, common_1.Param)('itemId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:itemId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'حذف آیتم از سبد خرید' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __param(2, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'خالی کردن سبد خرید' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clear", null);
__decorate([
    (0, common_1.Post)('convert'),
    (0, swagger_1.ApiOperation)({ summary: 'تبدیل سبد خرید به سفارش' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "convert", null);
__decorate([
    (0, common_1.Post)('abandon'),
    (0, swagger_1.ApiOperation)({ summary: 'رها کردن سبد خرید' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "abandon", null);
__decorate([
    (0, common_1.Post)('merge'),
    (0, swagger_1.ApiOperation)({ summary: 'ادغام سبد خرید مهمان به سبد کاربر لاگین شده' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)(CART_SESSION_HEADER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "mergeGuestCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('سبد خرید'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiCookieAuth)(CART_SESSION_COOKIE),
    (0, swagger_1.ApiHeader)({
        name: CART_SESSION_HEADER,
        required: false,
        description: 'شناسه نشست سبد خرید برای کاربران مهمان',
    }),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map