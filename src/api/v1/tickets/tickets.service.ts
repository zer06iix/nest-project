import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { Repository } from "typeorm";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { User } from "../users/entities/user.entity";
import { TicketMessage } from "./entities/ticket-messages.entity";



@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        @InjectRepository(TicketMessage)
        private readonly messageRepository: Repository<TicketMessage>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createTicketDto: CreateTicketDto, userId: string) {
        const ticket = this.ticketRepository.create({ ...createTicketDto, userId})
        
        return await this.ticketRepository.save(ticket);
    }

    async findOne(id: string) {
        const ticket = await this.ticketRepository.findOne({ 
            where: { id },
            relations: { user: true, assignedTo: true, messages: { sender: true } }
        });

        if (!ticket) throw new NotFoundException(`تیکت با آیدی ${id} پیدا نشد`);

        return ticket;
    }
}