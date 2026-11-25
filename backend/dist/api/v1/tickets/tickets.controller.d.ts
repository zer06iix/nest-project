import { type Request } from 'express';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateTicketMessageDto } from './dto/create-ticket-message.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsService } from './tickets.service';
import { Role } from '../common/enums/role.enum';
import { TicketStatus } from './enums/ticket-status.enum';
type AuthenticatedRequest = Request & {
    user: {
        userId: string;
        role: Role;
    };
};
export declare class TicketsController {
    private readonly ticketService;
    constructor(ticketService: TicketsService);
    create(dto: CreateTicketDto, req: AuthenticatedRequest): Promise<import("./entities/ticket.entity").Ticket>;
    findAll(req: AuthenticatedRequest, page: number, limit: number, status?: TicketStatus): Promise<{
        items: import("./entities/ticket.entity").Ticket[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, req: AuthenticatedRequest): Promise<import("./entities/ticket.entity").Ticket>;
    update(id: string, dto: UpdateTicketDto, req: AuthenticatedRequest): Promise<import("./entities/ticket.entity").Ticket>;
    addMessage(id: string, dto: CreateTicketMessageDto, req: AuthenticatedRequest): Promise<import("./entities/ticket-messages.entity").TicketMessage>;
}
export {};
