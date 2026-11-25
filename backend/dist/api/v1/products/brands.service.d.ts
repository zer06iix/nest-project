import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsService {
    private readonly brandRepository;
    constructor(brandRepository: Repository<Brand>);
    create(dto: CreateBrandDto): Promise<Brand>;
    findAll(): Promise<Brand[]>;
    findOne(id: string): Promise<Brand>;
    update(id: string, dto: UpdateBrandDto): Promise<Brand>;
    deactivate(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    private saveWithConflict;
}
