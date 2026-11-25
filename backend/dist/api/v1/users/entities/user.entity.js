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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("../../addresses/entities/address.entity");
const role_enum_1 = require("../../common/enums/role.enum");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity.js");
const ticket_messages_entity_1 = require("../../tickets/entities/ticket-messages.entity.js");
const nanoid_entity_1 = require("../../common/entities/nanoid.entity");
let User = class User extends nanoid_entity_1.NanoidEntity {
    phoneNumber;
    displayName;
    role;
    password;
    addresses;
    ticketsCreated;
    ticketsAssigned;
    ticketMessages;
    hashedRefreshToken;
    createdAt;
    updatedAt;
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number', unique: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_name', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: role_enum_1.Role,
        default: role_enum_1.Role.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.Address, (address) => address.user),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, (ticket) => ticket.user),
    __metadata("design:type", Array)
], User.prototype, "ticketsCreated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, (ticket) => ticket.assignedTo),
    __metadata("design:type", Array)
], User.prototype, "ticketsAssigned", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_messages_entity_1.TicketMessage, (ticketMessages) => ticketMessages.sender),
    __metadata("design:type", Array)
], User.prototype, "ticketMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'hashed_refresh_token', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "hashedRefreshToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map