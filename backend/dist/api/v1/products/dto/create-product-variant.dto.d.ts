import { AttributeValueDto } from './attribute-value.dto';
export declare class CreateProductVariantDto {
    title: string;
    sku?: string | null;
    isDefault?: boolean;
    isActive?: boolean;
    sortOrder?: number;
    attributes?: AttributeValueDto[];
}
