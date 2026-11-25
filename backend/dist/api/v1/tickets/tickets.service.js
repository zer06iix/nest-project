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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ticket_messages_entity_1 = require("./entities/ticket-messages.entity");
const ticket_status_enum_1 = require("./enums/ticket-status.enum");
const role_enum_1 = require("../common/enums/role.enum");
let TicketsService = class TicketsService {
    ticketRepository;
    messageRepository;
    userRepository;
    constructor(ticketRepository, messageRepository, userRepository) {
        this.ticketRepository = ticketRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    async create(dto, userId) {
        await this.userRepository.findOneByOrFail({ id: userId });
        const ticket = this.ticketRepository.create({ ...dto, userId });
        return this.ticketRepository.save(ticket);
    }
    async findAll(userId, role, page = 1, limit = 20, status) {
        const where = {};
        if (role !== role_enum_1.Role.ADMIN)
            where.userId = userId;
        if (status)
            where.status = status;
        const [tickets, total] = await this.ticketRepository.findAndCount({
            where,
            relations: { user: true, assignedTo: true },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { items: tickets, total, page, limit };
    }
    async findOne(id, userId, role) {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: {
                user: true,
                assignedTo: true,
                messages: { sender: true },
            },
            order: { messages: { createdAt: 'ASC' } },
        });
        if (!ticket)
            throw new common_1.NotFoundException(`تیکت با آیدی ${id} پیدا نشد`);
        this.assertCanAccess(ticket, userId, role);
        return ticket;
    }
    async update(id, dto, userId, role) {
        const ticket = await this.getTicket(id);
        this.assertCanAccess(ticket, userId, role);
        if (role !== role_enum_1.Role.ADMIN) {
            if (dto.status && dto.status !== ticket_status_enum_1.TicketStatus.CLOSED)
                throw new common_1.ForbiddenException('تغییر وضعیت تیکت فقط برای مدیر مجاز است');
            if (dto.assignedToId !== undefined)
                throw new common_1.ForbiddenException('تخصیص تیکت فقط برای مدیر مجاز است');
        }
        if (dto.assignedToId)
            await this.userRepository.findOneByOrFail({ id: dto.assignedToId });
        Object.assign(ticket, dto);
        if (dto.status === ticket_status_enum_1.TicketStatus.CLOSED || dto.status === ticket_status_enum_1.TicketStatus.RESOLVED)
            ticket.closedAt = new Date();
        else if (dto.status)
            ticket.closedAt = undefined;
        return this.ticketRepository.save(ticket);
    }
    async addMessage(id, userId, role, body) {
        const ticket = await this.getTicket(id);
        this.assertCanAccess(ticket, userId, role);
        if (ticket.status === ticket_status_enum_1.TicketStatus.CLOSED)
            throw new common_1.BadRequestException('برای ادامه گفتگو، تیکت بسته شده است');
        const message = this.messageRepository.create({
            ticketId: id,
            senderId: userId,
            body,
        });
        if (role === role_enum_1.Role.ADMIN)
            ticket.status = ticket_status_enum_1.TicketStatus.WAITING_FOR_CUSTOMER;
        else
            ticket.status = ticket_status_enum_1.TicketStatus.IN_PROGRESS;
        await this.ticketRepository.save(ticket);
        return this.messageRepository.save(message);
    }
    async getTicket(id) {
        const ticket = await this.ticketRepository.findOneBy({ id });
        if (!ticket)
            throw new common_1.NotFoundException(`تیکت با آیدی ${id} پیدا نشد`);
        return ticket;
    }
    assertCanAccess(ticket, userId, role) {
        if (role !== role_enum_1.Role.ADMIN && ticket.userId !== userId)
            throw new common_1.ForbiddenException('شما به این تیکت دسترسی ندارید');
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_messages_entity_1.TicketMessage)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map