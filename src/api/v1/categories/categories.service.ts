import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryAttribute } from '../attributes/entities/category-attribute.entity';
import { Attribute } from '../attributes/entities/attribute.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryAttributeDto } from '../attributes/dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../attributes/dto/update-category-attribute.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(CategoryAttribute)
        private readonly categoryAttributeRepository: Repository<CategoryAttribute>,
        @InjectRepository(Attribute)
        private readonly attributeRepository: Repository<Attribute>,
    ) {}

    async create(dto: CreateCategoryDto) {
        if (await this.categoryRepository.existsBy({ slug: dto.slug })) {
            throw new ConflictException('A category with this slug already exists');
        }

        if (dto.parentId) {
            const parent = await this.findCategoryById(dto.parentId);
            if (!parent.isActive) {
                throw new BadRequestException('An inactive category cannot be used as a parent');
            }
        }

        return this.saveWithConflict(
            () => this.categoryRepository.save(this.categoryRepository.create(dto)),
            'A category with this slug already exists',
        );
    }

    findAll() {
        return this.categoryRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }

    async findOneBySlug(slug: string) {
        const category = await this.categoryRepository.findOne({
            where: { slug, isActive: true },
            relations: { parent: true },
        });

        if (!category) throw new NotFoundException('Category not found');
        return category;
    }

    async findAttributesBySlug(slug: string) {
        const category = await this.categoryRepository.findOne({
            where: { slug, isActive: true },
            relations: { categoryAttributes: { attribute: true } },
        });

        if (!category) throw new NotFoundException('Category not found');

        return {
            categoryId: category.id,
            categorySlug: category.slug,
            attributes: category.categoryAttributes.filter(
                ({ attribute }) => attribute.isActive,
            ),
        };
    }

    async update(id: string, dto: UpdateCategoryDto) {
        const category = await this.findCategoryById(id);
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('At least one category field must be provided');
        }

        if (dto.slug && dto.slug !== category.slug) {
            if (await this.categoryRepository.existsBy({ slug: dto.slug })) {
                throw new ConflictException('A category with this slug already exists');
            }
        }

        if (dto.parentId !== undefined) {
            if (dto.parentId === id) {
                throw new BadRequestException('A category cannot be its own parent');
            }
            if (dto.parentId) {
                const parent = await this.findCategoryById(dto.parentId);
                if (!parent.isActive) {
                    throw new BadRequestException('An inactive category cannot be used as a parent');
                }
                await this.assertNoParentCycle(id, dto.parentId);
            }
        }

        Object.assign(category, dto);
        return this.saveWithConflict(
            () => this.categoryRepository.save(category),
            'A category with this slug already exists',
        );
    }

    async deactivate(id: string) {
        const category = await this.findCategoryById(id);
        if (await this.categoryRepository.existsBy({ parentId: id, isActive: true })) {
            throw new BadRequestException('Deactivate active child categories before deactivating this category');
        }
        category.isActive = false;
        await this.categoryRepository.save(category);
        return { id: category.id, isActive: category.isActive };
    }

    async addAttribute(categoryId: string, dto: CreateCategoryAttributeDto) {
        await this.findCategoryById(categoryId);
        const attribute = await this.attributeRepository.findOneBy({
            id: dto.attributeId,
            isActive: true,
        });
        if (!attribute) throw new NotFoundException('Active attribute not found');
        const existing = await this.categoryAttributeRepository.findOneBy({
            categoryId,
            attributeId: dto.attributeId,
        });
        if (existing) throw new ConflictException('This attribute is already assigned to the category');

        const categoryAttribute = this.categoryAttributeRepository.create({
            ...dto,
            categoryId,
        });
        return this.saveWithConflict(
            () => this.categoryAttributeRepository.save(categoryAttribute),
            'This attribute is already assigned to the category',
        );
    }

    async updateAttribute(
        categoryId: string,
        attributeId: string,
        dto: UpdateCategoryAttributeDto,
    ) {
        const categoryAttribute = await this.categoryAttributeRepository.findOneBy({
            categoryId,
            attributeId,
        });
        if (!categoryAttribute) throw new NotFoundException('Category attribute configuration not found');
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('At least one configuration field must be provided');
        }

        Object.assign(categoryAttribute, dto);
        return this.categoryAttributeRepository.save(categoryAttribute);
    }

    async removeAttribute(categoryId: string, attributeId: string) {
        const result = await this.categoryAttributeRepository.delete({ categoryId, attributeId });
        if (!result.affected) throw new NotFoundException('Category attribute configuration not found');
        return { categoryId, attributeId };
    }

    private async findCategoryById(id: string) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) throw new NotFoundException('Category not found');
        return category;
    }

    private async saveWithConflict<T>(save: () => Promise<T>, message: string): Promise<T> {
        try {
            return await save();
        } catch (error) {
            if (error instanceof QueryFailedError && error.driverError.code === '23505') {
                throw new ConflictException(message);
            }
            throw error;
        }
    }

    private async assertNoParentCycle(categoryId: string, proposedParentId: string) {
        const visited = new Set<string>();
        let currentId: string | null = proposedParentId;

        while (currentId) {
            if (currentId === categoryId) {
                throw new BadRequestException('A category cannot be moved under one of its descendants');
            }
            if (visited.has(currentId)) {
                throw new BadRequestException('The existing category hierarchy contains a cycle');
            }
            visited.add(currentId);
            const parent = await this.categoryRepository.findOne({
                where: { id: currentId },
                select: { id: true, parentId: true },
            });
            currentId = parent?.parentId ?? null;
        }
    }
}
