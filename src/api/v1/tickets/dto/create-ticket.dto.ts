import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Ticket } from "../entities/ticket.entity";
import { categories, TicketCategory } from "../enums/ticket-category.enum";


const cats = categories.map(status => status);

export class CreateTicketDto {
    @IsString({ message: 'موضوع تیکت باید یک رشته باشد' })
    @IsNotEmpty({ message: 'موضوع تیکت نباید خالی باشد باشد' })
    subject!: string;

    @IsEnum(TicketCategory, {
        message: `دسته بندی تیکت باید یکی از این مقادیر باشد: (${cats})`
    })
    @IsNotEmpty({ message: 'دسته بندی تیکت نباید خالی باشد باشد' })
    category!: TicketCategory;
    
    @IsString({ message: 'توضیحات تیکت باید یک رشته باشد' })
    @IsNotEmpty({ message: 'توضیحات تیکت نباید خالی باشد باشد' })
    description!: string;
}