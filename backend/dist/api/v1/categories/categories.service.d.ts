import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryAttribute } from '../attributes/entities/category-attribute.entity';
import { Attribute } from '../attributes/entities/attribute.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryAttributeDto } from '../attributes/dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../attributes/dto/update-category-attribute.dto';
export declare class CategoriesService {
    private readonly categoryRepository;
    private readonly categoryAttributeRepository;
    private readonly attributeRepository;
    constructor(categoryRepository: Repository<Category>, categoryAttributeRepository: Repository<CategoryAttribute>, attributeRepository: Repository<Attribute>);
    create(dto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOneBySlug(slug: string): Promise<Category>;
    findAttributesBySlug(slug: string): Promise<{
        categoryId: string;
        categorySlug: string;
        attributes: CategoryAttribute[];
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<Category>;
    deactivate(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    addAttribute(categoryId: string, dto: CreateCategoryAttributeDto): Promise<CategoryAttribute>;
    updateAttribute(categoryId: string, attributeId: string, dto: UpdateCategoryAttributeDto): Promise<CategoryAttribute>;
    removeAttribute(categoryId: string, attributeId: string): Promise<{
        categoryId: string;
        attributeId: string;
    }>;
    private findCategoryById;
    private saveWithConflict;
    private assertNoParentCycle;
}
