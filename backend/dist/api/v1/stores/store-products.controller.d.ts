import { StoresService } from './stores.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { QueryStoreProductsDto } from './dto/query-store-products.dto';
import { UpdateStoreProductPriceDto } from './dto/update-store-product-price.dto';
import { QueryPriceHistoryDto } from './dto/query-price-history.dto';
export declare class StoreProductsController {
    private readonly storesService;
    constructor(storesService: StoresService);
    create(dto: CreateStoreProductDto): Promise<import("./entities/store-product.entity").StoreProduct | null>;
    findAll(query: QueryStoreProductsDto): Promise<{
        items: import("./entities/store-product.entity").StoreProduct[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/store-product.entity").StoreProduct>;
    update(id: string, dto: UpdateStoreProductDto): Promise<import("./entities/store-product.entity").StoreProduct>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    createPrice(storeProductId: string, dto: UpdateStoreProductPriceDto): Promise<import("./entities/price.entity").Price>;
    updatePrice(storeProductId: string, dto: UpdateStoreProductPriceDto): Promise<import("./entities/price.entity").Price>;
    getPrice(storeProductId: string): Promise<import("./entities/price.entity").Price>;
    getPriceHistory(storeProductId: string, query: QueryPriceHistoryDto): Promise<{
        items: import("./entities/price-history.entity").PriceHistory[];
        total: number;
        page: number;
        limit: number;
    }>;
}
