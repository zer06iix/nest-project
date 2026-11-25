import { AttributesService } from '../services/attributes.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { CreateAttributeOptionDto } from '../dto/create-attribute-option.dto';
import { UpdateAttributeOptionDto } from '../dto/update-attribute-option.dto';
export declare class AttributesController {
    private readonly attributesService;
    constructor(attributesService: AttributesService);
    create(dto: CreateAttributeDto): Promise<import("../entities/attribute.entity").Attribute>;
    findAll(): Promise<import("../entities/attribute.entity").Attribute[]>;
    findOptions(id: string): Promise<import("../entities/attribute-option.entity").AttributeOption[]>;
    findOne(id: string): Promise<import("../entities/attribute.entity").Attribute>;
    update(id: string, dto: UpdateAttributeDto): Promise<import("../entities/attribute.entity").Attribute>;
    deactivate(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    createOption(id: string, dto: CreateAttributeOptionDto): Promise<import("../entities/attribute-option.entity").AttributeOption>;
    updateOption(optionId: string, dto: UpdateAttributeOptionDto): Promise<import("../entities/attribute-option.entity").AttributeOption>;
    deactivateOption(optionId: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
}
