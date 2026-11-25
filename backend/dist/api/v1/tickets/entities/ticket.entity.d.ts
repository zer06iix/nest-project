import { User } from "../../users/entities/user.entity.js";
import { TicketMessage } from './ticket-messages.entity';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketCategory } from '../enums/ticket-category.enum';
import { NanoidEntity } from '../../common/entities/nanoid.entity';
export declare class Ticket extends NanoidEntity {
    subject: string;
    category: TicketCategory;
    description: string;
    status: TicketStatus;
    userId?: string;
    assignedToId?: string;
    user: User;
    assignedTo?: User;
    messages: TicketMessage[];
    createdAt: Date;
    updatedAt: Date;
    closedAt?: Date;
}
