"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("./entities/user.entity");
const phone_1 = require("../common/utils/phone");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    normalizePhone(phone) {
        const normalized = (0, phone_1.normalizeIranPhoneNumber)(phone);
        if (!normalized)
            throw new common_1.BadRequestException('شماره موبایل معتبر نیست');
        return normalized;
    }
    async create(createUserDto) {
        const normalizedPhone = this.normalizePhone(createUserDto.phoneNumber);
        const existingUser = await this.userRepository.findOne({
            where: { phoneNumber: normalizedPhone },
        });
        if (existingUser)
            throw new common_1.ConflictException('کاربر با این مشخصات وجود دارد');
        if (createUserDto.password === undefined) {
            throw new common_1.BadRequestException('گذرواژه الزامی است');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = this.userRepository.create({
            ...createUserDto,
            phoneNumber: normalizedPhone,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(newUser);
        return savedUser;
    }
    async findAll(role, limit = 20, page = 1) {
        const query = this.userRepository.createQueryBuilder('users');
        if (role) {
            query.where('users.role = :role', { role });
        }
        query.skip((page - 1) * limit).take(limit);
        return await query.getMany();
    }
    async findOneById(id) {
        const user = await this.userRepository.findOneByOrFail({ id });
        if (!user)
            throw new common_1.NotFoundException(`کاربر با آیدی ${id} پیدا نشد`);
        return user;
    }
    async findOneByPhone(phoneNumber) {
        const normalizedPhone = this.normalizePhone(phoneNumber);
        const user = await this.userRepository.findOneBy({
            phoneNumber: normalizedPhone,
        });
        if (!user)
            throw new common_1.NotFoundException(`کاربر با شماره تماس ${phoneNumber} پیدا نشد`);
        return user;
    }
    async update(id, updateUserDto) {
        await this.userRepository.update(id, {
            displayName: updateUserDto.displayName,
            role: updateUserDto.role,
        });
        const user = await this.findOneById(id);
        return user;
    }
    async updateHashedRefreshToken(id, hashedRefreshToken) {
        if (hashedRefreshToken === undefined)
            throw new common_1.NotFoundException('توکنی پیدا نشد');
        await this.userRepository.update(id, { hashedRefreshToken });
    }
    async remove(id) {
        const result = await this.userRepository.delete({ id });
        if (result.affected === 0)
            throw new common_1.NotFoundException(`کاربر با آیدی ${id} پیدا نشد`);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map