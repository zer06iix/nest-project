import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";
import { UsersModule } from "../users/users.module";
import { User } from "../users/entities/user.entity";
import { TicketMessage } from "./entities/ticket-messages.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket, TicketMessage, User]),
        UsersModule
    ],
    controllers: [TicketsController],
    providers: [TicketsService],
})
export class TicketsModule {}