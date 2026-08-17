import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { Role } from '../../common/enums/role.enum';
import { Ticket } from 'api/v1/tickets/entities/ticket.entity';
import { TicketMessage } from 'api/v1/tickets/entities/ticket-messages.entity';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'phone_number', unique: true })
    phoneNumber!: string;

    @Column({ name: 'display_name', nullable: false })
    displayName!: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role!: Role;
    
    @Column({ nullable: true })
    password!: string;
    
    @OneToMany(() => Address, (address) => address.user, { nullable: true })
    addresses!: Address[];

    @OneToMany(() => Ticket, (ticket) => ticket.user, { nullable: true })
    @JoinColumn({ name: 'tickets_created' })
    ticketsCreated!: Ticket[];

    @OneToMany(() => Ticket, (ticket) => ticket.user, { nullable: true })
    @JoinColumn({ name: 'tickets_assigned' })
    ticketsAssigned!: Ticket[];

    @OneToMany(() => TicketMessage, (ticketMessages) => ticketMessages.sender, { nullable: true })
    @JoinColumn({ name: 'ticket_messages' })
    ticketMessages!: TicketMessage[];

    @Column({ type: "varchar", name: 'hashed_refresh_token', nullable: true })
    hashedRefreshToken!: string | null;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
