import { CategoryAttribute } from './category-attribute.entity';
import { AttributeOption } from './attribute-option.entity';
import { AttributeDataType } from '../enums/attribute-datatype.enum';
import { NanoidEntity } from '../../common/entities/nanoid.entity';
export declare class Attribute extends NanoidEntity {
    name: string;
    slug: string;
    dataType: AttributeDataType;
    unit: string | null;
    description: string | null;
    isActive: boolean;
    options: AttributeOption[];
    categoryAttributes: CategoryAttribute[];
    createdAt: Date;
    updatedAt: Date;
}
