import { CreateAddressDto } from './dto/create-address.dto';
import { AddressesService } from './addresses.service';
import { type Request } from 'express';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Role } from '../common/enums/role.enum';
type AuthenticatedRequest = Request & {
    user: {
        userId: string;
        role: Role;
    };
};
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(createAddressDto: CreateAddressDto, req: AuthenticatedRequest): Promise<import("./entities/address.entity").Address>;
    findOne(id: string): Promise<import("./entities/address.entity").Address>;
    findSelfAddresses(req: AuthenticatedRequest): Promise<import("./entities/address.entity").Address[]>;
    findUserAddresses(userId: string): Promise<import("./entities/address.entity").Address[]>;
    findAllAddresses(): Promise<import("./entities/address.entity").Address[]>;
    update(updateAddressDto: UpdateAddressDto, id: string): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<void>;
}
export {};
