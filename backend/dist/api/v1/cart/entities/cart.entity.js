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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
const nanoid_8_entity_1 = require("../../common/entities/nanoid-8.entity.js");
const user_entity_1 = require("../../users/entities/user.entity.js");
const cart_item_entity_1 = require("./cart-item.entity");
const cart_status_enum_1 = require("../enums/cart-status.enum");
let Cart = class Cart extends nanoid_8_entity_1.Nanoid8Entity {
    userId;
    user;
    sessionId;
    status;
    expiresAt;
    items;
    createdAt;
    updatedAt;
};
exports.Cart = Cart;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'varchar', length: 8, nullable: true }),
    __metadata("design:type", Object)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Object)
], Cart.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'session_id', type: 'varchar', length: 64, nullable: true }),
    __metadata("design:type", Object)
], Cart.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: cart_status_enum_1.CartStatus.ACTIVE }),
    __metadata("design:type", String)
], Cart.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at' }),
    __metadata("design:type", Date)
], Cart.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_item_entity_1.CartItem, (item) => item.cart),
    __metadata("design:type", Array)
], Cart.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Cart.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Cart.prototype, "updatedAt", void 0);
exports.Cart = Cart = __decorate([
    (0, typeorm_1.Entity)('cart')
], Cart);
//# sourceMappingURL=cart.entity.js.map