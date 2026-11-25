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
exports.ProductIdentifier = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity");
const product_entity_1 = require("./product.entity");
const product_identifier_type_enum_1 = require("../enums/product-identifier-type.enum");
let ProductIdentifier = class ProductIdentifier extends nanoid_8_entity_1.Nanoid8Entity {
    productId;
    product;
    type;
    value;
    createdAt;
};
exports.ProductIdentifier = ProductIdentifier;
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], ProductIdentifier.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.identifiers, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductIdentifier.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], ProductIdentifier.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], ProductIdentifier.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductIdentifier.prototype, "createdAt", void 0);
exports.ProductIdentifier = ProductIdentifier = __decorate([
    (0, typeorm_1.Entity)('product_identifiers'),
    (0, typeorm_1.Index)('uq_product_identifier_type_value', ['type', 'value'], { unique: true }),
    (0, typeorm_1.Index)('IDX_product_identifiers_product', ['productId'])
], ProductIdentifier);
//# sourceMappingURL=product-identifier.entity.js.map