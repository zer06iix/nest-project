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
exports.ProductImage = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity");
const product_entity_1 = require("./product.entity");
let ProductImage = class ProductImage extends nanoid_8_entity_1.Nanoid8Entity {
    productId;
    product;
    url;
    altText;
    isPrimary;
    sortOrder;
    createdAt;
};
exports.ProductImage = ProductImage;
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], ProductImage.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.images, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductImage.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2048 }),
    __metadata("design:type", String)
], ProductImage.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alt_text', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], ProductImage.prototype, "altText", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary', default: false }),
    __metadata("design:type", Boolean)
], ProductImage.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ProductImage.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductImage.prototype, "createdAt", void 0);
exports.ProductImage = ProductImage = __decorate([
    (0, typeorm_1.Entity)('product_images'),
    (0, typeorm_1.Index)('uq_product_images_primary', ['productId'], {
        unique: true,
        where: '"is_primary" = true',
    }),
    (0, typeorm_1.Index)('IDX_product_images_order', ['productId', 'sortOrder'])
], ProductImage);
//# sourceMappingURL=product-image.entity.js.map