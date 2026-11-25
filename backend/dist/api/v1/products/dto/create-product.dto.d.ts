import { ProductStatus } from '../enums/product-status.enum';
import { AttributeValueDto } from './attribute-value.dto';
export declare class CreateProductDto {
    name: string;
    slug: string;
    description?: string | null;
    categoryId: string;
    brandId?: string | null;
    status?: ProductStatus;
    attributes?: AttributeValueDto[];
}
