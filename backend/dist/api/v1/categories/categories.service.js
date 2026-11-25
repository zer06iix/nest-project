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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const category_attribute_entity_1 = require("../attributes/entities/category-attribute.entity");
const attribute_entity_1 = require("../attributes/entities/attribute.entity");
let CategoriesService = class CategoriesService {
    categoryRepository;
    categoryAttributeRepository;
    attributeRepository;
    constructor(categoryRepository, categoryAttributeRepository, attributeRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryAttributeRepository = categoryAttributeRepository;
        this.attributeRepository = attributeRepository;
    }
    async create(dto) {
        if (await this.categoryRepository.existsBy({ slug: dto.slug })) {
            throw new common_1.ConflictException('A category with this slug already exists');
        }
        if (dto.parentId) {
            const parent = await this.findCategoryById(dto.parentId);
            if (!parent.isActive) {
                throw new common_1.BadRequestException('An inactive category cannot be used as a parent');
            }
        }
        return this.saveWithConflict(() => this.categoryRepository.save(this.categoryRepository.create(dto)), 'A category with this slug already exists');
    }
    findAll() {
        return this.categoryRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }
    async findOneBySlug(slug) {
        const category = await this.categoryRepository.findOne({
            where: { slug, isActive: true },
            relations: { parent: true },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async findAttributesBySlug(slug) {
        const category = await this.categoryRepository.findOne({
            where: { slug, isActive: true },
            relations: { categoryAttributes: { attribute: true } },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return {
            categoryId: category.id,
            categorySlug: category.slug,
            attributes: category.categoryAttributes.filter(({ attribute }) => attribute.isActive),
        };
    }
    async update(id, dto) {
        const category = await this.findCategoryById(id);
        if (Object.keys(dto).length === 0) {
            throw new common_1.BadRequestException('At least one category field must be provided');
        }
        if (dto.slug && dto.slug !== category.slug) {
            if (await this.categoryRepository.existsBy({ slug: dto.slug })) {
                throw new common_1.ConflictException('A category with this slug already exists');
            }
        }
        if (dto.parentId !== undefined) {
            if (dto.parentId === id) {
                throw new common_1.BadRequestException('A category cannot be its own parent');
            }
            if (dto.parentId) {
                const parent = await this.findCategoryById(dto.parentId);
                if (!parent.isActive) {
                    throw new common_1.BadRequestException('An inactive category cannot be used as a parent');
                }
                await this.assertNoParentCycle(id, dto.parentId);
            }
        }
        Object.assign(category, dto);
        return this.saveWithConflict(() => this.categoryRepository.save(category), 'A category with this slug already exists');
    }
    async deactivate(id) {
        const category = await this.findCategoryById(id);
        if (await this.categoryRepository.existsBy({
            parentId: id,
            isActive: true,
        })) {
            throw new common_1.BadRequestException('Deactivate active child categories before deactivating this category');
        }
        category.isActive = false;
        await this.categoryRepository.save(category);
        return { id: category.id, isActive: category.isActive };
    }
    async addAttribute(categoryId, dto) {
        await this.findCategoryById(categoryId);
        const attribute = await this.attributeRepository.findOneBy({
            id: dto.attributeId,
            isActive: true,
        });
        if (!attribute)
            throw new common_1.NotFoundException('Active attribute not found');
        const existing = await this.categoryAttributeRepository.findOneBy({
            categoryId,
            attributeId: dto.attributeId,
        });
        if (existing)
            throw new common_1.ConflictException('This attribute is already assigned to the category');
        const categoryAttribute = this.categoryAttributeRepository.create({
            ...dto,
            categoryId,
        });
        return this.saveWithConflict(() => this.categoryAttributeRepository.save(categoryAttribute), 'This attribute is already assigned to the category');
    }
    async updateAttribute(categoryId, attributeId, dto) {
        const categoryAttribute = await this.categoryAttributeRepository.findOneBy({
            categoryId,
            attributeId,
        });
        if (!categoryAttribute)
            throw new common_1.NotFoundException('Category attribute configuration not found');
        if (Object.keys(dto).length === 0) {
            throw new common_1.BadRequestException('At least one configuration field must be provided');
        }
        Object.assign(categoryAttribute, dto);
        return this.categoryAttributeRepository.save(categoryAttribute);
    }
    async removeAttribute(categoryId, attributeId) {
        const result = await this.categoryAttributeRepository.delete({
            categoryId,
            attributeId,
        });
        if (!result.affected)
            throw new common_1.NotFoundException('Category attribute configuration not found');
        return { categoryId, attributeId };
    }
    async findCategoryById(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
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
    async assertNoParentCycle(categoryId, proposedParentId) {
        const visited = new Set();
        let currentId = proposedParentId;
        while (currentId) {
            if (currentId === categoryId) {
                throw new common_1.BadRequestException('A category cannot be moved under one of its descendants');
            }
            if (visited.has(currentId)) {
                throw new common_1.BadRequestException('The existing category hierarchy contains a cycle');
            }
            visited.add(currentId);
            const parent = await this.categoryRepository.findOne({
                where: { id: currentId },
                select: { id: true, parentId: true },
            });
            currentId = parent?.parentId ?? null;
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(category_attribute_entity_1.CategoryAttribute)),
    __param(2, (0, typeorm_1.InjectRepository)(attribute_entity_1.Attribute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map