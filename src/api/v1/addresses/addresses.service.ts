import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Address } from "./entities/address.entity";
import { CreateAddressDto } from "./dto/create-address.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "../users/users.service";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { User } from "../users/entities/user.entity";




@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UsersService,
    ) {}

    async create(createAddressDto: CreateAddressDto, userId: string) {
        const user = await this.userService.findOneById(userId);
        console.log(user)

        const address = this.addressRepository.create({ ...createAddressDto, user });
        return this.addressRepository.save(address);
    }

    async findAllAddresses(limit: number = 20, page: number = 1) {
        return await this.addressRepository
            .createQueryBuilder('addresses')
            .leftJoinAndSelect('addresses.user', 'user')
            .skip((page - 1) * limit).take(limit)
            .getMany();
    }

    async findUserAddresses(userId: string) {
        const user = await this.userService.findOneById(userId);
        console.log(user)
        return user.addresses;
    }

    async findOne(id: string) {
        const address = await this.addressRepository.findOneByOrFail({ id });
        
        if (!address) throw new NotFoundException('آدرسی با این آیدی پیدا نشد')

        return address;
    }

    async update(id: string, updateAddressDto: UpdateAddressDto) {
        const address = await this.findOne(id);
        
        return await this.addressRepository.update(address.id, updateAddressDto)
    }
    
    async remove(id: string) {
        const address = await this.addressRepository.delete({ id })

        if (address.affected === 0) throw new NotFoundException('آدرسی با این آیدی پیدا نشد')
    }
    
}