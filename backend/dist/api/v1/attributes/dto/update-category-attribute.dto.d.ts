import { AttributeDisplayType } from '../enums/attribute-display-type.enum';
export declare class UpdateCategoryAttributeDto {
    isRequired?: boolean;
    isFilterable?: boolean;
    isVisibleOnCard?: boolean;
    isVisibleOnProduct?: boolean;
    isVariantAttribute?: boolean;
    displayType?: AttributeDisplayType;
    sortOrder?: number;
}
