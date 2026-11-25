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
exports.TicketMessage = void 0;
const user_entity_1 = require("../../users/entities/user.entity.js");
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const nanoid_entity_1 = require("../../common/entities/nanoid.entity");
let TicketMessage = class TicketMessage extends nanoid_entity_1.NanoidEntity {
    ticketId;
    senderId;
    body;
    ticket;
    sender;
    createdAt;
    updatedAt;
};
exports.TicketMessage = TicketMessage;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 36, nullable: false, name: 'ticket_id' }),
    __metadata("design:type", String)
], TicketMessage.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 36, nullable: false, name: 'sender_id' }),
    __metadata("design:type", String)
], TicketMessage.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], TicketMessage.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, (ticket) => ticket.messages, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_id' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], TicketMessage.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.ticketMessages, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sender_id' }),
    __metadata("design:type", user_entity_1.User)
], TicketMessage.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TicketMessage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TicketMessage.prototype, "updatedAt", void 0);
exports.TicketMessage = TicketMessage = __decorate([
    (0, typeorm_1.Entity)('ticket_message')
], TicketMessage);
//# sourceMappingURL=ticket-messages.entity.js.map