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
exports.Price = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity");
const store_product_entity_1 = require("./store-product.entity");
let Price = class Price extends nanoid_8_entity_1.Nanoid8Entity {
    storeProductId;
    storeProduct;
    amount;
    originalAmount;
    currency;
    createdAt;
    updatedAt;
};
exports.Price = Price;
__decorate([
    (0, typeorm_1.Column)({
        name: 'store_product_id',
        type: 'varchar',
        length: 8,
        unique: true,
    }),
    __metadata("design:type", String)
], Price.prototype, "storeProductId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => store_product_entity_1.StoreProduct, (storeProduct) => storeProduct.price, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'store_product_id' }),
    __metadata("design:type", store_product_entity_1.StoreProduct)
], Price.prototype, "storeProduct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 20, scale: 6 }),
    __metadata("design:type", String)
], Price.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'original_amount',
        type: 'numeric',
        precision: 20,
        scale: 6,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Price.prototype, "originalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3, default: 'IRR' }),
    __metadata("design:type", String)
], Price.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Price.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Price.prototype, "updatedAt", void 0);
exports.Price = Price = __decorate([
    (0, typeorm_1.Entity)('prices'),
    (0, typeorm_1.Check)('CHK_prices_amount_positive', '"amount" > 0'),
    (0, typeorm_1.Check)('CHK_prices_original_amount_valid', '"original_amount" IS NULL OR "original_amount" >= "amount"')
], Price);
//# sourceMappingURL=price.entity.js.map