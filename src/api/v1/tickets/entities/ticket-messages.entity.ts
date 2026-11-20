import { User } from 'api/v1/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { NanoidEntity } from '../../common/entities/nanoid.entity';

@Entity('ticket_message')
export class TicketMessage extends NanoidEntity {
    @Column({ type: 'varchar', length: 36, nullable: false, name: 'ticket_id' })
    ticketId!: string;

    @Column({ type: 'varchar', length: 36, nullable: false, name: 'sender_id' })
    senderId!: string;

    @Column({ type: 'text', nullable: false })
    body!: string;

    @ManyToOne(() => Ticket, (ticket) => ticket.messages, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'ticket_id' })
    ticket!: Ticket;

    @ManyToOne(() => User, (user) => user.ticketMessages, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'sender_id' })
    sender!: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
