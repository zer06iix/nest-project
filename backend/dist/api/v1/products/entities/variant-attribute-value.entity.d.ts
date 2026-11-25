import { Nanoid8Entity } from '../../common/entities/nanoid-8.entity';
import { ProductVariant } from './product-variant.entity';
import { Attribute } from '../../attributes/entities/attribute.entity';
import { AttributeOption } from '../../attributes/entities/attribute-option.entity';
export declare class VariantAttributeValue extends Nanoid8Entity {
    variantId: string;
    variant: ProductVariant;
    attributeId: string;
    attribute: Attribute;
    optionId: string | null;
    option: AttributeOption | null;
    valueText: string | null;
    valueNumber: string | null;
    valueBoolean: boolean | null;
    valueDate: string | null;
    createdAt: Date;
}
