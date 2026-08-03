import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'phone_number', unique: true })
    phoneNumber: string;

    @Column({ name: 'display_name', nullable: false })
    displayName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @Column({ nullable: true })
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
