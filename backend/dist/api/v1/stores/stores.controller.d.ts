import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { QueryStoresDto } from './dto/query-stores.dto';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { UpdateStoreProductPriceDto } from './dto/update-store-product-price.dto';
import { QueryPriceHistoryDto } from './dto/query-price-history.dto';
import { QueryStoreProductsDto } from './dto/query-store-products.dto';
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    create(dto: CreateStoreDto): Promise<import("./entities/store.entity").Store>;
    findAll(query: QueryStoresDto): Promise<{
        items: import("./entities/store.entity").Store[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllForAdmin(query: QueryStoresDto): Promise<{
        items: import("./entities/store.entity").Store[];
        total: number;
        page: number;
        limit: number;
    }>;
    findBySlug(slug: string): Promise<import("./entities/store.entity").Store>;
    priceHistory(id: string, storeProductId: string, query: QueryPriceHistoryDto): Promise<{
        items: import("./entities/price-history.entity").PriceHistory[];
        total: number;
        page: number;
        limit: number;
    }>;
    findListing(id: string, storeProductId: string): Promise<import("./entities/store-product.entity").StoreProduct>;
    findListings(id: string, query: QueryStoreProductsDto): Promise<{
        items: import("./entities/store-product.entity").StoreProduct[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/store.entity").Store>;
    update(id: string, dto: UpdateStoreDto): Promise<import("./entities/store.entity").Store>;
    deactivate(id: string): Promise<{
        id: string;
        status: import("./enums/store-status.enum").StoreStatus;
    }>;
    createListing(id: string, dto: CreateStoreProductDto): Promise<import("./entities/store-product.entity").StoreProduct | null>;
    updateListing(id: string, storeProductId: string, dto: UpdateStoreProductDto): Promise<import("./entities/store-product.entity").StoreProduct>;
    deactivateListing(id: string, storeProductId: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    updatePrice(id: string, storeProductId: string, dto: UpdateStoreProductPriceDto): Promise<import("./entities/price.entity").Price>;
}
