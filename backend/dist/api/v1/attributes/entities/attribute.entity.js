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
exports.Attribute = void 0;
const typeorm_1 = require("typeorm");
const category_attribute_entity_1 = require("./category-attribute.entity");
const attribute_option_entity_1 = require("./attribute-option.entity");
const attribute_datatype_enum_1 = require("../enums/attribute-datatype.enum");
const nanoid_entity_1 = require("../../common/entities/nanoid.entity");
let Attribute = class Attribute extends nanoid_entity_1.NanoidEntity {
    name;
    slug;
    dataType;
    unit;
    description;
    isActive;
    options;
    categoryAttributes;
    createdAt;
    updatedAt;
};
exports.Attribute = Attribute;
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 120 }),
    __metadata("design:type", String)
], Attribute.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 140 }),
    __metadata("design:type", String)
], Attribute.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_type', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Attribute.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 40 }),
    __metadata("design:type", Object)
], Attribute.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Attribute.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Attribute.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attribute_option_entity_1.AttributeOption, (option) => option.attribute),
    __metadata("design:type", Array)
], Attribute.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_attribute_entity_1.CategoryAttribute, (categoryAttribute) => categoryAttribute.attribute),
    __metadata("design:type", Array)
], Attribute.prototype, "categoryAttributes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Attribute.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Attribute.prototype, "updatedAt", void 0);
exports.Attribute = Attribute = __decorate([
    (0, typeorm_1.Entity)('attributes'),
    (0, typeorm_1.Index)('uq_attributes_slug', ['slug'], { unique: true })
], Attribute);
//# sourceMappingURL=attribute.entity.js.map