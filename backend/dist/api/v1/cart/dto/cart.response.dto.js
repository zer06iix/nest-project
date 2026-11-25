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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const cart_item_response_dto_1 = require("./cart-item.response.dto");
const cart_status_enum_1 = require("../enums/cart-status.enum");
const user_entity_1 = require("../../users/entities/user.entity");
class CartResponseDto {
    id;
    userId;
    status;
    expiresAt;
    items;
    user;
    createdAt;
    updatedAt;
    get totalItems() {
        return this.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    }
    get totalPrice() {
        return this.items?.reduce((sum, item) => sum + item.lineTotal, 0) || 0;
    }
}
exports.CartResponseDto = CartResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه سبد خرید' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CartResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه کاربر' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CartResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: cart_status_enum_1.CartStatus, description: 'وضعیت سبد خرید' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CartResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'تاریخ انقضا' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CartResponseDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [cart_item_response_dto_1.CartItemResponseDto], description: 'آیتم‌های سبد خرید' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => cart_item_response_dto_1.CartItemResponseDto),
    __metadata("design:type", Array)
], CartResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, description: 'کاربر' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], CartResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'تاریخ ایجاد' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CartResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'تاریخ به‌روزرسانی' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CartResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'تعداد کل آیتم‌ها در سبد خرید' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], CartResponseDto.prototype, "totalItems", null);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'مبلغ کل تمام آیتم‌های سبد خرید' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], CartResponseDto.prototype, "totalPrice", null);
//# sourceMappingURL=cart.response.dto.js.map