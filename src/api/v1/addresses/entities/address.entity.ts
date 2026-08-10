import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";


@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ nullable: false })
    province!: string

    @Column({ nullable: false })
    city!: string

    @Column({ nullable: false })
    address!: string

    @Column({ name: 'postal_code', length: 10 })
    postalCode!: string

    @Column({ name: 'receiver_mobile', length: 11})
    receiverMobile!: string

    @Column({ nullable: true })
    description!: string

    @ManyToOne(() => User, (user) => user.addresses)
    @JoinColumn()
    user!: User

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}