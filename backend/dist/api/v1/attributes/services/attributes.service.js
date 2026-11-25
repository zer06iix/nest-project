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
exports.AttributesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attribute_entity_1 = require("../entities/attribute.entity");
const attribute_option_entity_1 = require("../entities/attribute-option.entity");
const attribute_datatype_enum_1 = require("../enums/attribute-datatype.enum");
let AttributesService = class AttributesService {
    attributeRepository;
    optionRepository;
    constructor(attributeRepository, optionRepository) {
        this.attributeRepository = attributeRepository;
        this.optionRepository = optionRepository;
    }
    async create(dto) {
        if (await this.attributeRepository.existsBy({ slug: dto.slug })) {
            throw new common_1.ConflictException('An attribute with this slug already exists');
        }
        return this.saveWithConflict(() => this.attributeRepository.save(this.attributeRepository.create(dto)), 'An attribute with this slug already exists');
    }
    findAll() {
        return this.attributeRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const attribute = await this.findAttributeById(id);
        if (!attribute.isActive)
            throw new common_1.NotFoundException('Attribute not found');
        return attribute;
    }
    async update(id, dto) {
        const attribute = await this.findAttributeById(id);
        if (Object.keys(dto).length === 0) {
            throw new common_1.BadRequestException('At least one attribute field must be provided');
        }
        if (dto.slug && dto.slug !== attribute.slug) {
            if (await this.attributeRepository.existsBy({ slug: dto.slug })) {
                throw new common_1.ConflictException('An attribute with this slug already exists');
            }
        }
        if (dto.dataType &&
            dto.dataType !== attribute.dataType &&
            (await this.optionRepository.existsBy({ attributeId: id }))) {
            throw new common_1.BadRequestException('The data type cannot change while the attribute has options');
        }
        Object.assign(attribute, dto);
        return this.saveWithConflict(() => this.attributeRepository.save(attribute), 'An attribute with this slug already exists');
    }
    async deactivate(id) {
        const attribute = await this.findAttributeById(id);
        attribute.isActive = false;
        await this.attributeRepository.save(attribute);
        return { id: attribute.id, isActive: attribute.isActive };
    }
    async findOptions(attributeId) {
        const attribute = await this.findAttributeById(attributeId);
        if (!attribute.isActive)
            throw new common_1.NotFoundException('Attribute not found');
        return this.optionRepository.find({
            where: { attributeId, isActive: true },
            order: { label: 'ASC' },
        });
    }
    async createOption(attributeId, dto) {
        const attribute = await this.findAttributeById(attributeId);
        if (!attribute.isActive)
            throw new common_1.NotFoundException('Attribute not found');
        if (attribute.dataType !== attribute_datatype_enum_1.AttributeDataType.OPTION) {
            throw new common_1.BadRequestException('Options can only be added to OPTION attributes');
        }
        if (await this.optionRepository.existsBy({
            attributeId,
            value: dto.value,
        })) {
            throw new common_1.ConflictException('This option value already exists for the attribute');
        }
        return this.saveWithConflict(() => this.optionRepository.save(this.optionRepository.create({ ...dto, attributeId })), 'This option value already exists for the attribute');
    }
    async updateOption(optionId, dto) {
        const option = await this.optionRepository.findOneBy({ id: optionId });
        if (!option)
            throw new common_1.NotFoundException('Attribute option not found');
        if (Object.keys(dto).length === 0) {
            throw new common_1.BadRequestException('At least one option field must be provided');
        }
        if (dto.value && dto.value !== option.value) {
            const duplicate = await this.optionRepository.existsBy({
                attributeId: option.attributeId,
                value: dto.value,
            });
            if (duplicate)
                throw new common_1.ConflictException('This option value already exists for the attribute');
        }
        Object.assign(option, dto);
        return this.saveWithConflict(() => this.optionRepository.save(option), 'This option value already exists for the attribute');
    }
    async deactivateOption(optionId) {
        const option = await this.optionRepository.findOneBy({ id: optionId });
        if (!option)
            throw new common_1.NotFoundException('Attribute option not found');
        option.isActive = false;
        await this.optionRepository.save(option);
        return { id: option.id, isActive: option.isActive };
    }
    async findAttributeById(id) {
        const attribute = await this.attributeRepository.findOneBy({ id });
        if (!attribute)
            throw new common_1.NotFoundException('Attribute not found');
        return attribute;
    }
    async saveWithConflict(save, message) {
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
                throw new common_1.ConflictException(message);
            }
            throw error;
        }
    }
};
exports.AttributesService = AttributesService;
exports.AttributesService = AttributesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attribute_entity_1.Attribute)),
    __param(1, (0, typeorm_1.InjectRepository)(attribute_option_entity_1.AttributeOption)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AttributesService);
//# sourceMappingURL=attributes.service.js.map