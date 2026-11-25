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
exports.Ticket = void 0;
const user_entity_1 = require("../../users/entities/user.entity.js");
const typeorm_1 = require("typeorm");
const ticket_messages_entity_1 = require("./ticket-messages.entity");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
const ticket_category_enum_1 = require("../enums/ticket-category.enum");
const nanoid_entity_1 = require("../../common/entities/nanoid.entity");
let Ticket = class Ticket extends nanoid_entity_1.NanoidEntity {
    subject;
    category;
    description;
    status;
    userId;
    assignedToId;
    user;
    assignedTo;
    messages;
    createdAt;
    updatedAt;
    closedAt;
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Ticket.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Ticket.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: ticket_status_enum_1.TicketStatus.OPEN }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 36, nullable: false, name: 'user_id' }),
    __metadata("design:type", String)
], Ticket.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 36,
        nullable: true,
        name: 'assigned_to_id',
    }),
    __metadata("design:type", String)
], Ticket.prototype, "assignedToId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.ticketsCreated),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Ticket.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.ticketsAssigned, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_to_id' }),
    __metadata("design:type", user_entity_1.User)
], Ticket.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_messages_entity_1.TicketMessage, (ticketMessages) => ticketMessages.ticket),
    __metadata("design:type", Array)
], Ticket.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Ticket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'closed_at', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "closedAt", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)('tickets')
], Ticket);
//# sourceMappingURL=ticket.entity.js.map