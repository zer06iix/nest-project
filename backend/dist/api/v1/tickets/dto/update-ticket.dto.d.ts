import { TicketStatus } from '../enums/ticket-status.enum';
export declare class UpdateTicketDto {
    status?: TicketStatus;
    assignedToId?: string;
    subject?: string;
    description?: string;
}
