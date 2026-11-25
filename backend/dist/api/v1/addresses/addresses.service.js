"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./entities/address.entity");
const typeorm_2 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
let AddressesService = class AddressesService {
    addressRepository;
    userRepository;
    userService;
    constructor(addressRepository, userRepository, userService) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }
    async create(createAddressDto, userId) {
        const user = await this.userService.findOneById(userId);
        const address = this.addressRepository.create({
            ...createAddressDto,
            user,
        });
        return this.addressRepository.save(address);
    }
    async findAllAddresses(limit = 20, page = 1) {
        return await this.addressRepository
            .createQueryBuilder('addresses')
            .leftJoinAndSelect('addresses.user', 'user')
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
    }
    async findUserAddresses(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: { addresses: true },
        });
        if (!user)
            throw new common_1.NotFoundException(`کاربر با آیدی ${userId} پیدا نشد`);
        return user.addresses;
    }
    async findOne(id) {
        const address = await this.addressRepository.findOneByOrFail({ id });
        if (!address)
            throw new common_1.NotFoundException('آدرسی با این آیدی پیدا نشد');
        return address;
    }
    async update(id, updateAddressDto) {
        const address = await this.findOne(id);
        return await this.addressRepository.update(address.id, updateAddressDto);
    }
    async remove(id) {
        const address = await this.addressRepository.delete({ id });
        if (address.affected === 0)
            throw new common_1.NotFoundException('آدرسی با این آیدی پیدا نشد');
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(address_entity_1.Address)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        users_service_1.UsersService])
], AddressesService);
//# sourceMappingURL=addresses.service.js.map