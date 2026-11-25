import { Attribute } from './attribute.entity';
import { NanoidEntity } from '../../common/entities/nanoid.entity';
export declare class AttributeOption extends NanoidEntity {
    attributeId: string;
    attribute: Attribute;
    label: string;
    value: string;
    metadata: Record<string, unknown> | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
