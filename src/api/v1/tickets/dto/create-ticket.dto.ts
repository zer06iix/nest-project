import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { categories, TicketCategory } from '../enums/ticket-category.enum';
import { ApiProperty } from '@nestjs/swagger';

const cats = categories.map((status) => status).join(', ');

export class CreateTicketDto {
    @ApiProperty({
        description: 'موضوع تیکت',
        example: 'مشکل در پرداخت',
    })
    @IsString({ message: 'موضوع تیکت باید یک رشته باشد' })
    @IsNotEmpty({ message: 'موضوع تیکت نباید خالی باشد باشد' })
    subject!: string;

    @ApiProperty({
        description: 'دسته بندی تیکت',
        example: 'پرداخت',
    })
    @IsEnum(TicketCategory, {
        message: `دسته بندی تیکت باید یکی از این مقادیر باشد: (${cats})`,
    })
    @IsNotEmpty({ message: 'دسته بندی تیکت نباید خالی باشد باشد' })
    category!: TicketCategory;

    @ApiProperty({
        description: 'توضیحات تیکت',
        example: '',
    })
    @IsString({ message: 'توضیحات تیکت باید یک رشته باشد' })
    @IsNotEmpty({ message: 'توضیحات تیکت نباید خالی باشد باشد' })
    description!: string;
}
