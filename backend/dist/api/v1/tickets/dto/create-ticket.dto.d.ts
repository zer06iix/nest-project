import { TicketCategory } from '../enums/ticket-category.enum';
export declare class CreateTicketDto {
    subject: string;
    category: TicketCategory;
    description: string;
}
