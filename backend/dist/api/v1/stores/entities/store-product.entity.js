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
exports.StoreProduct = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity");
const store_entity_1 = require("./store.entity");
const product_variant_entity_1 = require("../../products/entities/product-variant.entity");
const availability_status_enum_1 = require("../enums/availability-status.enum");
const stock_status_enum_1 = require("../enums/stock-status.enum");
const price_entity_1 = require("./price.entity");
const price_history_entity_1 = require("./price-history.entity");
const store_product_status_enum_1 = require("../enums/store-product-status.enum");
let StoreProduct = class StoreProduct extends nanoid_8_entity_1.Nanoid8Entity {
    storeId;
    store;
    productVariantId;
    productVariant;
    externalProductId;
    externalUrl;
    title;
    description;
    availabilityStatus;
    stockStatus;
    stockQuantity;
    status;
    lastCheckedAt;
    isActive;
    price;
    priceHistory;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.StoreProduct = StoreProduct;
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], StoreProduct.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, (store) => store.products, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", store_entity_1.Store)
], StoreProduct.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_variant_id', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], StoreProduct.prototype, "productVariantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_variant_entity_1.ProductVariant, (variant) => variant.storeProducts, {
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_variant_id' }),
    __metadata("design:type", product_variant_entity_1.ProductVariant)
], StoreProduct.prototype, "productVariant", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'external_product_id',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], StoreProduct.prototype, "externalProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'external_url',
        type: 'varchar',
        length: 2048,
        nullable: true,
    }),
    __metadata("design:type", Object)
], StoreProduct.prototype, "externalUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], StoreProduct.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StoreProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'availability_status',
        type: 'varchar',
        length: 16,
        default: availability_status_enum_1.AvailabilityStatus.AVAILABLE,
    }),
    __metadata("design:type", String)
], StoreProduct.prototype, "availabilityStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'stock_status',
        type: 'varchar',
        length: 16,
        default: stock_status_enum_1.StockStatus.UNKNOWN,
    }),
    __metadata("design:type", String)
], StoreProduct.prototype, "stockStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_quantity', type: 'integer', nullable: true }),
    __metadata("design:type", Object)
], StoreProduct.prototype, "stockQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'varchar',
        length: 16,
        default: store_product_status_enum_1.StoreProductStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], StoreProduct.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_checked_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], StoreProduct.prototype, "lastCheckedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], StoreProduct.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => price_entity_1.Price, (price) => price.storeProduct),
    __metadata("design:type", price_entity_1.Price)
], StoreProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => price_history_entity_1.PriceHistory, (history) => history.storeProduct),
    __metadata("design:type", Array)
], StoreProduct.prototype, "priceHistory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StoreProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StoreProduct.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], StoreProduct.prototype, "deletedAt", void 0);
exports.StoreProduct = StoreProduct = __decorate([
    (0, typeorm_1.Entity)('store_products'),
    (0, typeorm_1.Check)('CHK_store_products_stock_quantity', '"stock_quantity" IS NULL OR "stock_quantity" >= 0'),
    (0, typeorm_1.Check)('CHK_store_products_stock_consistency', `("stock_status" != 'OUT_OF_STOCK' OR "stock_quantity" IS NULL OR "stock_quantity" = 0)
     AND ("stock_status" != 'IN_STOCK' OR "stock_quantity" IS NULL OR "stock_quantity" > 0)`),
    (0, typeorm_1.Index)('uq_store_products_store_variant', ['storeId', 'productVariantId'], {
        unique: true,
    }),
    (0, typeorm_1.Index)('uq_store_products_external_id', ['storeId', 'externalProductId'], {
        unique: true,
        where: '"external_product_id" IS NOT NULL',
    }),
    (0, typeorm_1.Index)('IDX_store_products_active_stock', ['isActive', 'availabilityStatus', 'stockStatus'])
], StoreProduct);
//# sourceMappingURL=store-product.entity.js.map