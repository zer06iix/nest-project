import { User } from "../../users/entities/user.entity.js";
import { Ticket } from './ticket.entity';
import { NanoidEntity } from '../../common/entities/nanoid.entity';
export declare class TicketMessage extends NanoidEntity {
    ticketId: string;
    senderId: string;
    body: string;
    ticket: Ticket;
    sender: User;
    createdAt: Date;
    updatedAt: Date;
}
