import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from '../users/entities/user.entity';
import { TicketMessage } from './entities/ticket-messages.entity';
import { TicketStatus } from './enums/ticket-status.enum';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket) private readonly ticketRepository: Repository<Ticket>,
        @InjectRepository(TicketMessage) private readonly messageRepository: Repository<TicketMessage>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async create(dto: CreateTicketDto, userId: string) {
        await this.userRepository.findOneByOrFail({ id: userId });
        const ticket = this.ticketRepository.create({ ...dto, userId });
        return this.ticketRepository.save(ticket);
    }

    async findAll(userId: string, role: Role, page = 1, limit = 20, status?: TicketStatus) {
        const where: FindOptionsWhere<Ticket> = {};
        if (role !== Role.ADMIN) where.userId = userId;
        if (status) where.status = status;
        const [tickets, total] = await this.ticketRepository.findAndCount({
            where,
            relations: { user: true, assignedTo: true },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { items: tickets, total, page, limit };
    }

    async findOne(id: string, userId: string, role: Role) {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: { user: true, assignedTo: true, messages: { sender: true } },
            order: { messages: { createdAt: 'ASC' } },
        });
        if (!ticket) throw new NotFoundException(`تیکت با آیدی ${id} پیدا نشد`);
        this.assertCanAccess(ticket, userId, role);
        return ticket;
    }

    async update(id: string, dto: UpdateTicketDto, userId: string, role: Role) {
        const ticket = await this.getTicket(id);
        this.assertCanAccess(ticket, userId, role);
        if (role !== Role.ADMIN) {
            if (dto.status && dto.status !== TicketStatus.CLOSED)
                throw new ForbiddenException('تغییر وضعیت تیکت فقط برای مدیر مجاز است');
            if (dto.assignedToId !== undefined)
                throw new ForbiddenException('تخصیص تیکت فقط برای مدیر مجاز است');
        }
        if (dto.assignedToId) await this.userRepository.findOneByOrFail({ id: dto.assignedToId });
        Object.assign(ticket, dto);
        if (dto.status === TicketStatus.CLOSED || dto.status === TicketStatus.RESOLVED) ticket.closedAt = new Date();
        else if (dto.status) ticket.closedAt = undefined;
        return this.ticketRepository.save(ticket);
    }

    async addMessage(id: string, userId: string, role: Role, body: string) {
        const ticket = await this.getTicket(id);
        this.assertCanAccess(ticket, userId, role);
        if (ticket.status === TicketStatus.CLOSED)
            throw new BadRequestException('برای ادامه گفتگو، تیکت بسته شده است');
        const message = this.messageRepository.create({ ticketId: id, senderId: userId, body });
        if (role === Role.ADMIN) ticket.status = TicketStatus.WAITING_FOR_CUSTOMER;
        else ticket.status = TicketStatus.IN_PROGRESS;
        await this.ticketRepository.save(ticket);
        return this.messageRepository.save(message);
    }

    private async getTicket(id: string) {
        const ticket = await this.ticketRepository.findOneBy({ id });
        if (!ticket) throw new NotFoundException(`تیکت با آیدی ${id} پیدا نشد`);
        return ticket;
    }

    private assertCanAccess(ticket: Ticket, userId: string, role: Role) {
        if (role !== Role.ADMIN && ticket.userId !== userId)
            throw new ForbiddenException('شما به این تیکت دسترسی ندارید');
    }
}
