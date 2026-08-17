import { User } from "api/v1/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketMessage } from "./ticket-messages.entity";
import { TicketStatus } from "../enums/ticket-status.enum";
import { TicketCategory } from "../enums/ticket-category.enum";



@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({ nullable: false })
    subject!: string;
    
    @Column({ nullable: false })
    category!: TicketCategory

    @Column()
    description!: string

    @Column({ default: TicketStatus.OPEN })
    status!: TicketStatus
    
    @Column({ nullable: false, name: 'user_id' })
    userId?: string;

    @Column({ nullable: true, name: 'assigned_to_id' })
    assignedToId?: string;

    @ManyToOne(() => User, (user) => user.ticketsCreated)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => User, (user) => user.ticketsAssigned)
    @JoinColumn({ name: 'assigned_to_id' })
    assignedTo?: User;
    
    @OneToMany(() => TicketMessage, (ticketMessages) => ticketMessages.ticket)
    messages!: TicketMessage[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Column({ name: 'closed_at', nullable: true, type: 'date' })
    closedAt?: Date
}