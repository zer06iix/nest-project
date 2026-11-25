import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from '../users/entities/user.entity';
import { TicketMessage } from './entities/ticket-messages.entity';
import { TicketStatus } from './enums/ticket-status.enum';
import { Role } from '../common/enums/role.enum';
export declare class TicketsService {
    private readonly ticketRepository;
    private readonly messageRepository;
    private readonly userRepository;
    constructor(ticketRepository: Repository<Ticket>, messageRepository: Repository<TicketMessage>, userRepository: Repository<User>);
    create(dto: CreateTicketDto, userId: string): Promise<Ticket>;
    findAll(userId: string, role: Role, page?: number, limit?: number, status?: TicketStatus): Promise<{
        items: Ticket[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, userId: string, role: Role): Promise<Ticket>;
    update(id: string, dto: UpdateTicketDto, userId: string, role: Role): Promise<Ticket>;
    addMessage(id: string, userId: string, role: Role, body: string): Promise<TicketMessage>;
    private getTicket;
    private assertCanAccess;
}
