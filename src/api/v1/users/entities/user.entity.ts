import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Roles } from '../enums/RoleEnum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    phone_number: string;

    @Column({ nullable: false })
    display_name: string;

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.USER,
    })
    role: Roles;

    @Column({ nullable: true })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
