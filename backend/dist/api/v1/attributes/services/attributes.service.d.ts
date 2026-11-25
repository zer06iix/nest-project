import { Repository } from 'typeorm';
import { Attribute } from '../entities/attribute.entity';
import { AttributeOption } from '../entities/attribute-option.entity';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { CreateAttributeOptionDto } from '../dto/create-attribute-option.dto';
import { UpdateAttributeOptionDto } from '../dto/update-attribute-option.dto';
export declare class AttributesService {
    private readonly attributeRepository;
    private readonly optionRepository;
    constructor(attributeRepository: Repository<Attribute>, optionRepository: Repository<AttributeOption>);
    create(dto: CreateAttributeDto): Promise<Attribute>;
    findAll(): Promise<Attribute[]>;
    findOne(id: string): Promise<Attribute>;
    update(id: string, dto: UpdateAttributeDto): Promise<Attribute>;
    deactivate(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    findOptions(attributeId: string): Promise<AttributeOption[]>;
    createOption(attributeId: string, dto: CreateAttributeOptionDto): Promise<AttributeOption>;
    updateOption(optionId: string, dto: UpdateAttributeOptionDto): Promise<AttributeOption>;
    deactivateOption(optionId: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    private findAttributeById;
    private saveWithConflict;
}
