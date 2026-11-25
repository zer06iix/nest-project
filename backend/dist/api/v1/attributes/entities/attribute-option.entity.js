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
exports.AttributeOption = void 0;
const typeorm_1 = require("typeorm");
const attribute_entity_1 = require("./attribute.entity");
const nanoid_entity_1 = require("../../common/entities/nanoid.entity");
let AttributeOption = class AttributeOption extends nanoid_entity_1.NanoidEntity {
    attributeId;
    attribute;
    label;
    value;
    metadata;
    isActive;
    createdAt;
    updatedAt;
};
exports.AttributeOption = AttributeOption;
__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_id', type: 'varchar', length: 36 }),
    __metadata("design:type", String)
], AttributeOption.prototype, "attributeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attribute_entity_1.Attribute, (attribute) => attribute.options, {
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'attribute_id' }),
    __metadata("design:type", attribute_entity_1.Attribute)
], AttributeOption.prototype, "attribute", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], AttributeOption.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 140 }),
    __metadata("design:type", String)
], AttributeOption.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AttributeOption.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], AttributeOption.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AttributeOption.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], AttributeOption.prototype, "updatedAt", void 0);
exports.AttributeOption = AttributeOption = __decorate([
    (0, typeorm_1.Entity)('attribute_options'),
    (0, typeorm_1.Index)('uq_attribute_options_attribute_value', ['attributeId', 'value'], {
        unique: true,
    })
], AttributeOption);
//# sourceMappingURL=attribute-option.entity.js.map