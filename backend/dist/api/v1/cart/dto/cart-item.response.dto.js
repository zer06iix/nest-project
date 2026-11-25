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
exports.CartItemResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const store_product_entity_1 = require("../../stores/entities/store-product.entity");
class CartItemResponseDto {
    id;
    cartId;
    storeProductId;
    quantity;
    storeProduct;
    createdAt;
    updatedAt;
    get lineTotal() {
        const price = this.storeProduct?.price;
        const amount = price ? parseFloat(price.amount) : 0;
        return this.quantity * amount;
    }
}
exports.CartItemResponseDto = CartItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه آیتم' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CartItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه سبد خرید' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CartItemResponseDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه محصول فروشگاه' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CartItemResponseDto.prototype, "storeProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'تعداد' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => store_product_entity_1.StoreProduct, description: 'محصول فروشگاه' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => store_product_entity_1.StoreProduct),
    __metadata("design:type", store_product_entity_1.StoreProduct)
], CartItemResponseDto.prototype, "storeProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'تاریخ ایجاد' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CartItemResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'تاریخ به‌روزرسانی' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CartItemResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'مبلغ کل این سطر (تعداد × قیمت واحد)' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], CartItemResponseDto.prototype, "lineTotal", null);
//# sourceMappingURL=cart-item.response.dto.js.map