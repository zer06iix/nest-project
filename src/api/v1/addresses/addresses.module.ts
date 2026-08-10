import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "./entities/address.entity";
import { AddressesController } from "./addresses.controller";
import { AddressesService } from "./addresses.service";
import { UsersModule } from "../users/users.module";
import { User } from "../users/entities/user.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([User, Address]),
        UsersModule,
    ],
    controllers: [AddressesController],
    providers: [AddressesService],
})
export class AddressesModule {}