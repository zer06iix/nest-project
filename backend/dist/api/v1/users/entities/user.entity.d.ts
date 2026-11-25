import { Address } from '../../addresses/entities/address.entity';
import { Role } from '../../common/enums/role.enum';
import { Ticket } from "../../tickets/entities/ticket.entity.js";
import { TicketMessage } from "../../tickets/entities/ticket-messages.entity.js";
import { NanoidEntity } from '../../common/entities/nanoid.entity';
export declare class User extends NanoidEntity {
    phoneNumber: string;
    displayName: string;
    role: Role;
    password: string;
    addresses: Address[];
    ticketsCreated: Ticket[];
    ticketsAssigned: Ticket[];
    ticketMessages: TicketMessage[];
    hashedRefreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}
