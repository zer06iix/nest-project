import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { Role } from '../../common/enums/role.enum';


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
    
    @OneToMany(() => Address, (address) => address.user, { nullable: true, eager: true })
    addresses!: Address[];

    @Column({ type: "varchar", name: 'hashed_refresh_token', nullable: true })
    hashedRefreshToken!: string | null;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
