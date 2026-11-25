import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UsersService } from '../users/users.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from '../users/entities/user.entity';
export declare class AddressesService {
    private readonly addressRepository;
    private readonly userRepository;
    private readonly userService;
    constructor(addressRepository: Repository<Address>, userRepository: Repository<User>, userService: UsersService);
    create(createAddressDto: CreateAddressDto, userId: string): Promise<Address>;
    findAllAddresses(limit?: number, page?: number): Promise<Address[]>;
    findUserAddresses(userId: string): Promise<Address[]>;
    findOne(id: string): Promise<Address>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<void>;
}
