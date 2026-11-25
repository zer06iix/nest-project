import { AttributeDataType } from '../enums/attribute-datatype.enum';
export declare class CreateAttributeDto {
    name: string;
    slug: string;
    dataType: AttributeDataType;
    unit?: string | null;
    description?: string | null;
    isActive?: boolean;
}
