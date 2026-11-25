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
exports.VariantAttributeValue = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity");
const product_variant_entity_1 = require("./product-variant.entity");
const attribute_entity_1 = require("../../attributes/entities/attribute.entity");
const attribute_option_entity_1 = require("../../attributes/entities/attribute-option.entity");
let VariantAttributeValue = class VariantAttributeValue extends nanoid_8_entity_1.Nanoid8Entity {
    variantId;
    variant;
    attributeId;
    attribute;
    optionId;
    option;
    valueText;
    valueNumber;
    valueBoolean;
    valueDate;
    createdAt;
};
exports.VariantAttributeValue = VariantAttributeValue;
__decorate([
    (0, typeorm_1.Column)({ name: 'variant_id', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], VariantAttributeValue.prototype, "variantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_variant_entity_1.ProductVariant, (variant) => variant.attributeValues, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'variant_id' }),
    __metadata("design:type", product_variant_entity_1.ProductVariant)
], VariantAttributeValue.prototype, "variant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_id', type: 'varchar', length: 36 }),
    __metadata("design:type", String)
], VariantAttributeValue.prototype, "attributeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attribute_entity_1.Attribute, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'attribute_id' }),
    __metadata("design:type", attribute_entity_1.Attribute)
], VariantAttributeValue.prototype, "attribute", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'option_id', type: 'varchar', length: 36, nullable: true }),
    __metadata("design:type", Object)
], VariantAttributeValue.prototype, "optionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attribute_option_entity_1.AttributeOption, { nullable: true, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'option_id' }),
    __metadata("design:type", Object)
], VariantAttributeValue.prototype, "option", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value_text', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], VariantAttributeValue.prototype, "valueText", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'value_number',
        type: 'numeric',
        precision: 20,
        scale: 6,
        nullable: true,
    }),
    __metadata("design:type", Object)
], VariantAttributeValue.prototype, "valueNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value_boolean', type: 'boolean', nullable: true }),
    __metadata("design:type", Object)
], VariantAttributeValue.prototype, "valueBoolean", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], VariantAttributeValue.prototype, "valueDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], VariantAttributeValue.prototype, "createdAt", void 0);
exports.VariantAttributeValue = VariantAttributeValue = __decorate([
    (0, typeorm_1.Entity)('variant_attribute_values'),
    (0, typeorm_1.Index)('uq_variant_attribute_value', ['variantId', 'attributeId'], {
        unique: true,
    }),
    (0, typeorm_1.Check)('CHK_variant_attribute_value_one_value', `(("option_id" IS NOT NULL)::int + ("value_text" IS NOT NULL)::int + ("value_number" IS NOT NULL)::int + ("value_boolean" IS NOT NULL)::int + ("value_date" IS NOT NULL)::int) = 1`)
], VariantAttributeValue);
//# sourceMappingURL=variant-attribute-value.entity.js.map