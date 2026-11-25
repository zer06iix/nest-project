import { DataSource, Repository } from 'typeorm';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { Store } from './entities/store.entity';
import { StoreProduct } from './entities/store-product.entity';
import { Price } from './entities/price.entity';
import { PriceHistory } from './entities/price-history.entity';
import { StoreStatus } from './enums/store-status.enum';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { QueryStoresDto } from './dto/query-stores.dto';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { UpdateStoreProductPriceDto } from './dto/update-store-product-price.dto';
import { QueryPriceHistoryDto } from './dto/query-price-history.dto';
import { QueryStoreProductsDto } from './dto/query-store-products.dto';
export declare class StoresService {
    private readonly storeRepository;
    private readonly storeProductRepository;
    private readonly variantRepository;
    private readonly priceRepository;
    private readonly priceHistoryRepository;
    private readonly dataSource;
    constructor(storeRepository: Repository<Store>, storeProductRepository: Repository<StoreProduct>, variantRepository: Repository<ProductVariant>, priceRepository: Repository<Price>, priceHistoryRepository: Repository<PriceHistory>, dataSource: DataSource);
    create(dto: CreateStoreDto): Promise<Store>;
    findAll(query: QueryStoresDto, includeNonActive?: boolean): Promise<{
        items: Store[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllListings(query: QueryStoreProductsDto): Promise<{
        items: StoreProduct[];
        total: number;
        page: number;
        limit: number;
    }>;
    findListingById(id: string): Promise<StoreProduct>;
    createListingWithoutStoreParam(dto: CreateStoreProductDto): Promise<StoreProduct | null>;
    updateListingById(id: string, dto: UpdateStoreProductDto): Promise<StoreProduct>;
    deactivateListingById(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    updatePriceByListingId(id: string, dto: UpdateStoreProductPriceDto): Promise<Price>;
    createPrice(id: string, dto: UpdateStoreProductPriceDto): Promise<Price>;
    getPrice(id: string): Promise<Price>;
    priceHistoryByListingId(id: string, query: QueryPriceHistoryDto): Promise<{
        items: PriceHistory[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Store>;
    findBySlug(slug: string): Promise<Store>;
    update(id: string, dto: UpdateStoreDto): Promise<Store>;
    deactivate(id: string): Promise<{
        id: string;
        status: StoreStatus;
    }>;
    createListing(storeId: string, dto: CreateStoreProductDto): Promise<StoreProduct | null>;
    findListings(storeId: string, page?: number, limit?: number): Promise<{
        items: StoreProduct[];
        total: number;
        page: number;
        limit: number;
    }>;
    findListing(storeId: string, listingId: string): Promise<StoreProduct>;
    updateListing(storeId: string, listingId: string, dto: UpdateStoreProductDto): Promise<StoreProduct>;
    deactivateListing(storeId: string, listingId: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    updatePrice(storeId: string, listingId: string, dto: UpdateStoreProductPriceDto): Promise<Price>;
    priceHistory(storeId: string, listingId: string, query: QueryPriceHistoryDto): Promise<{
        items: PriceHistory[];
        total: number;
        page: number;
        limit: number;
    }>;
    private priceHistoryWithQuery;
    private validateMoney;
    private validateStock;
    private saveWithConflict;
}
