import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TicketStatus } from '../enums/ticket-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDto {
    @ApiProperty({
        description: "وضعیت تیکت",
        example: 'درحال پیگیری'
    })
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;

    @ApiProperty({
        description: "آیدی متقاضی تیکت",
        example: '3242342'
    })
    @IsOptional()
    @IsUUID()
    assignedToId?: string;

    @ApiProperty({
        description: "موضوع تیکت",
        example: 'مشکل در پرداخت'
    })
    @IsOptional()
    @IsString()
    subject?: string;

    @ApiProperty({
        description: "توضیحات تیکت",
        example: ''
    })
    @IsOptional()
    @IsString()
    description?: string;
}
