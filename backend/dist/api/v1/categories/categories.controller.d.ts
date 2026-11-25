import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryAttributeDto } from '../attributes/dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../attributes/dto/update-category-attribute.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(dto: CreateCategoryDto): Promise<import("./entities/category.entity").Category>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findAttributes(slug: string): Promise<{
        categoryId: string;
        categorySlug: string;
        attributes: import("../attributes/entities/category-attribute.entity").CategoryAttribute[];
    }>;
    findOne(slug: string): Promise<import("./entities/category.entity").Category>;
    update(id: string, dto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
    deactivate(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    addAttribute(id: string, dto: CreateCategoryAttributeDto): Promise<import("../attributes/entities/category-attribute.entity").CategoryAttribute>;
    updateAttribute(id: string, attributeId: string, dto: UpdateCategoryAttributeDto): Promise<import("../attributes/entities/category-attribute.entity").CategoryAttribute>;
    removeAttribute(id: string, attributeId: string): Promise<{
        categoryId: string;
        attributeId: string;
    }>;
}
