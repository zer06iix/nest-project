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
exports.CartItem = void 0;
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity.js");
const store_product_entity_1 = require("../../stores/entities/store-product.entity.js");
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
let CartItem = class CartItem extends nanoid_8_entity_1.Nanoid8Entity {
    cartId;
    cart;
    storeProductId;
    storeProduct;
    quantity;
    createdAt;
    updatedAt;
};
exports.CartItem = CartItem;
__decorate([
    (0, typeorm_1.Column)({ name: 'cart_id', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], CartItem.prototype, "cartId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_entity_1.Cart, (cart) => cart.items),
    (0, typeorm_1.JoinColumn)({ name: 'cart_id' }),
    __metadata("design:type", cart_entity_1.Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_product_id', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], CartItem.prototype, "storeProductId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_product_entity_1.StoreProduct),
    (0, typeorm_1.JoinColumn)({ name: 'store_product_id' }),
    __metadata("design:type", store_product_entity_1.StoreProduct)
], CartItem.prototype, "storeProduct", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity', type: 'integer' }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CartItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CartItem.prototype, "updatedAt", void 0);
exports.CartItem = CartItem = __decorate([
    (0, typeorm_1.Entity)('cart_item')
], CartItem);
//# sourceMappingURL=cart-item.entity.js.map