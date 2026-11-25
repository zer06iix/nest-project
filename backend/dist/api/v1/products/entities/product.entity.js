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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
const product_status_enum_1 = require("../enums/product-status.enum");
const brand_entity_1 = require("./brand.entity");
const product_variant_entity_1 = require("./product-variant.entity");
const product_image_entity_1 = require("./product-image.entity");
const product_attribute_value_entity_1 = require("./product-attribute-value.entity");
const product_identifier_entity_1 = require("./product-identifier.entity");
let Product = class Product extends nanoid_8_entity_1.Nanoid8Entity {
    name;
    slug;
    description;
    categoryId;
    category;
    brandId;
    brand;
    status;
    variants;
    images;
    attributeValues;
    identifiers;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'varchar', length: 36 }),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_id', type: 'varchar', length: 8, nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand, (brand) => brand.products, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'brand_id' }),
    __metadata("design:type", Object)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 16, default: product_status_enum_1.ProductStatus.DRAFT }),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_variant_entity_1.ProductVariant, (variant) => variant.product),
    __metadata("design:type", Array)
], Product.prototype, "variants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_image_entity_1.ProductImage, (image) => image.product),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_attribute_value_entity_1.ProductAttributeValue, (value) => value.product),
    __metadata("design:type", Array)
], Product.prototype, "attributeValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_identifier_entity_1.ProductIdentifier, (identifier) => identifier.product),
    __metadata("design:type", Array)
], Product.prototype, "identifiers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "deletedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products'),
    (0, typeorm_1.Index)('uq_products_slug', ['slug'], { unique: true }),
    (0, typeorm_1.Index)('IDX_products_category_status', ['categoryId', 'status']),
    (0, typeorm_1.Index)('IDX_products_brand_status', ['brandId', 'status'])
], Product);
//# sourceMappingURL=product.entity.js.map