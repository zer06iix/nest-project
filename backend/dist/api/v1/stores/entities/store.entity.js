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
exports.Store = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity");
const store_status_enum_1 = require("../enums/store-status.enum");
const store_product_entity_1 = require("./store-product.entity");
let Store = class Store extends nanoid_8_entity_1.Nanoid8Entity {
    name;
    slug;
    description;
    logo;
    website;
    email;
    phone;
    status;
    products;
    createdAt;
    updatedAt;
};
exports.Store = Store;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Store.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Store.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Store.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Store.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Store.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Store.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 16, default: store_status_enum_1.StoreStatus.PENDING }),
    __metadata("design:type", String)
], Store.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_product_entity_1.StoreProduct, (listing) => listing.store),
    __metadata("design:type", Array)
], Store.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Store.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Store.prototype, "updatedAt", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)('stores'),
    (0, typeorm_1.Index)('uq_stores_slug', ['slug'], { unique: true }),
    (0, typeorm_1.Index)('IDX_stores_status_name', ['status', 'name'])
], Store);
//# sourceMappingURL=store.entity.js.map