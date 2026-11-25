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
exports.CategoryAttribute = void 0;
const typeorm_1 = require("typeorm");
const attribute_entity_1 = require("./attribute.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
const attribute_display_type_enum_1 = require("../enums/attribute-display-type.enum");
const nanoid_entity_1 = require("../../common/entities/nanoid.entity");
let CategoryAttribute = class CategoryAttribute extends nanoid_entity_1.NanoidEntity {
    isRequired;
    isFilterable;
    isVisibleOnCard;
    isVisibleOnProduct;
    isVariantAttribute;
    displayType;
    sortOrder;
    categoryId;
    category;
    attributeId;
    attribute;
    createdAt;
    updatedAt;
};
exports.CategoryAttribute = CategoryAttribute;
__decorate([
    (0, typeorm_1.Column)({ name: 'is_required', default: false }),
    __metadata("design:type", Boolean)
], CategoryAttribute.prototype, "isRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_filterable', default: false }),
    __metadata("design:type", Boolean)
], CategoryAttribute.prototype, "isFilterable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_visible_on_card', default: true }),
    __metadata("design:type", Boolean)
], CategoryAttribute.prototype, "isVisibleOnCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_visible_on_product', default: true }),
    __metadata("design:type", Boolean)
], CategoryAttribute.prototype, "isVisibleOnProduct", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_variant_attribute', default: false }),
    __metadata("design:type", Boolean)
], CategoryAttribute.prototype, "isVariantAttribute", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_type', default: 'SELECT' }),
    __metadata("design:type", String)
], CategoryAttribute.prototype, "displayType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', default: 0 }),
    __metadata("design:type", Number)
], CategoryAttribute.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'varchar', length: 36 }),
    __metadata("design:type", String)
], CategoryAttribute.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.categoryAttributes),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], CategoryAttribute.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_id', type: 'varchar', length: 36 }),
    __metadata("design:type", String)
], CategoryAttribute.prototype, "attributeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attribute_entity_1.Attribute, (attribute) => attribute.categoryAttributes),
    (0, typeorm_1.JoinColumn)({ name: 'attribute_id' }),
    __metadata("design:type", attribute_entity_1.Attribute)
], CategoryAttribute.prototype, "attribute", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CategoryAttribute.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CategoryAttribute.prototype, "updatedAt", void 0);
exports.CategoryAttribute = CategoryAttribute = __decorate([
    (0, typeorm_1.Entity)('category_attribute'),
    (0, typeorm_1.Index)('uq_category_attribute_category_attribute', ['categoryId', 'attributeId'], { unique: true })
], CategoryAttribute);
//# sourceMappingURL=category-attribute.entity.js.map