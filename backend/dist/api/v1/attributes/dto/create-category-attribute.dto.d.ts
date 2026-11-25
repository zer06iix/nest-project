import { AttributeDisplayType } from '../enums/attribute-display-type.enum';
export declare class CreateCategoryAttributeDto {
    attributeId: string;
    isRequired?: boolean;
    isFilterable?: boolean;
    isVisibleOnCard?: boolean;
    isVisibleOnProduct?: boolean;
    isVariantAttribute?: boolean;
    displayType?: AttributeDisplayType;
    sortOrder?: number;
}
