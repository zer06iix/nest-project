import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    create(dto: CreateBrandDto): Promise<import("./entities/brand.entity").Brand>;
    findAll(): Promise<import("./entities/brand.entity").Brand[]>;
    findOne(id: string): Promise<import("./entities/brand.entity").Brand>;
    update(id: string, dto: UpdateBrandDto): Promise<import("./entities/brand.entity").Brand>;
    deactivate(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
}
