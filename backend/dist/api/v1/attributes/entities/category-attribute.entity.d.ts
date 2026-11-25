import { Attribute } from './attribute.entity';
import { Category } from '../../categories/entities/category.entity';
import { AttributeDisplayType } from '../enums/attribute-display-type.enum';
import { NanoidEntity } from '../../common/entities/nanoid.entity';
export declare class CategoryAttribute extends NanoidEntity {
    isRequired: boolean;
    isFilterable: boolean;
    isVisibleOnCard: boolean;
    isVisibleOnProduct: boolean;
    isVariantAttribute: boolean;
    displayType: AttributeDisplayType;
    sortOrder: number;
    categoryId: string;
    category: Category;
    attributeId: string;
    attribute: Attribute;
    createdAt: Date;
    updatedAt: Date;
}
