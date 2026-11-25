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
exports.ProductVariant = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity");
const product_entity_1 = require("./product.entity");
const variant_attribute_value_entity_1 = require("./variant-attribute-value.entity");
const store_product_entity_1 = require("../../stores/entities/store-product.entity");
let ProductVariant = class ProductVariant extends nanoid_8_entity_1.Nanoid8Entity {
    productId;
    product;
    title;
    sku;
    isDefault;
    isActive;
    sortOrder;
    attributeValues;
    storeProducts;
    createdAt;
    updatedAt;
};
exports.ProductVariant = ProductVariant;
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], ProductVariant.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.variants, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductVariant.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], ProductVariant.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ProductVariant.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_default', default: false }),
    __metadata("design:type", Boolean)
], ProductVariant.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], ProductVariant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => variant_attribute_value_entity_1.VariantAttributeValue, (value) => value.variant),
    __metadata("design:type", Array)
], ProductVariant.prototype, "attributeValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_product_entity_1.StoreProduct, (listing) => listing.productVariant),
    __metadata("design:type", Array)
], ProductVariant.prototype, "storeProducts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductVariant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProductVariant.prototype, "updatedAt", void 0);
exports.ProductVariant = ProductVariant = __decorate([
    (0, typeorm_1.Entity)('product_variants'),
    (0, typeorm_1.Index)('IDX_product_variants_product_active', ['productId', 'isActive']),
    (0, typeorm_1.Index)('uq_product_variants_sku', ['sku'], {
        unique: true,
        where: '"sku" IS NOT NULL',
    }),
    (0, typeorm_1.Index)('uq_product_variants_default', ['productId'], {
        unique: true,
        where: '"is_default" = true',
    })
], ProductVariant);
//# sourceMappingURL=product-variant.entity.js.map