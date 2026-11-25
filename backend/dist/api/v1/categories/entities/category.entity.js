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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const category_attribute_entity_1 = require("../../attributes/entities/category-attribute.entity");
const nanoid_entity_1 = require("../../common/entities/nanoid.entity");
let Category = class Category extends nanoid_entity_1.NanoidEntity {
    name;
    slug;
    description;
    imageUrl;
    isActive;
    seoTitle;
    seoDescription;
    parentId;
    parent;
    children;
    categoryAttributes;
    createdAt;
    updatedAt;
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 140 }),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Category.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seo_title', type: 'varchar', length: 160, nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "seoTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'seo_description',
        type: 'varchar',
        length: 320,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Category.prototype, "seoDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', type: 'varchar', length: 36, nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category, (category) => category.children, {
        nullable: true,
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Object)
], Category.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Category, (category) => category.parent),
    __metadata("design:type", Array)
], Category.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_attribute_entity_1.CategoryAttribute, (categoryAttribute) => categoryAttribute.category),
    __metadata("design:type", Array)
], Category.prototype, "categoryAttributes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)('categories'),
    (0, typeorm_1.Index)('uq_categories_slug', ['slug'], { unique: true })
], Category);
//# sourceMappingURL=category.entity.js.map