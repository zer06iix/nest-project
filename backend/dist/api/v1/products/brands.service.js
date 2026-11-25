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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const brand_entity_1 = require("./entities/brand.entity");
let BrandsService = class BrandsService {
    brandRepository;
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
    }
    async create(dto) {
        return this.saveWithConflict(() => this.brandRepository.save(this.brandRepository.create(dto)));
    }
    findAll() {
        return this.brandRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const brand = await this.brandRepository.findOneBy({
            id,
            isActive: true,
        });
        if (!brand)
            throw new common_1.NotFoundException('Brand not found');
        return brand;
    }
    async update(id, dto) {
        const brand = await this.brandRepository.findOneBy({ id });
        if (!brand)
            throw new common_1.NotFoundException('Brand not found');
        Object.assign(brand, dto);
        return this.saveWithConflict(() => this.brandRepository.save(brand));
    }
    async deactivate(id) {
        const brand = await this.brandRepository.findOneBy({ id });
        if (!brand)
            throw new common_1.NotFoundException('Brand not found');
        brand.isActive = false;
        await this.brandRepository.save(brand);
        return { id, isActive: false };
    }
    async saveWithConflict(save) {
        try {
            return await save();
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError &&
                error.driverError &&
                typeof error.driverError === 'object' &&
                error.driverError !== null &&
                'code' in error.driverError &&
                error.driverError.code === '23505') {
                throw new common_1.ConflictException('A brand with this slug already exists');
            }
            throw error;
        }
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BrandsService);
//# sourceMappingURL=brands.service.js.map