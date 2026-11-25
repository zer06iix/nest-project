"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_variant_entity_1 = require("../products/entities/product-variant.entity");
const product_status_enum_1 = require("../products/enums/product-status.enum");
const store_entity_1 = require("./entities/store.entity");
const store_product_entity_1 = require("./entities/store-product.entity");
const price_entity_1 = require("./entities/price.entity");
const price_history_entity_1 = require("./entities/price-history.entity");
const store_status_enum_1 = require("./enums/store-status.enum");
const stock_status_enum_1 = require("./enums/stock-status.enum");
const store_product_status_enum_1 = require("./enums/store-product-status.enum");
let StoresService = class StoresService {
    storeRepository;
    storeProductRepository;
    variantRepository;
    priceRepository;
    priceHistoryRepository;
    dataSource;
    constructor(storeRepository, storeProductRepository, variantRepository, priceRepository, priceHistoryRepository, dataSource) {
        this.storeRepository = storeRepository;
        this.storeProductRepository = storeProductRepository;
        this.variantRepository = variantRepository;
        this.priceRepository = priceRepository;
        this.priceHistoryRepository = priceHistoryRepository;
        this.dataSource = dataSource;
    }
    async create(dto) {
        return this.saveWithConflict(() => this.storeRepository.save(this.storeRepository.create({
            ...dto,
            status: dto.status ?? store_status_enum_1.StoreStatus.PENDING,
        })), 'A store with this slug already exists');
    }
    async findAll(query, includeNonActive = false) {
        const builder = this.storeRepository
            .createQueryBuilder('store')
            .orderBy('store.createdAt', 'DESC');
        if (includeNonActive) {
            if (query.status)
                builder.where('store.status = :status', {
                    status: query.status,
                });
        }
        else {
            builder.where('store.status = :activeStatus', {
                activeStatus: store_status_enum_1.StoreStatus.ACTIVE,
            });
        }
        if (query.search) {
            builder.andWhere('store.name ILIKE :search', {
                search: `%${query.search.trim()}%`,
            });
        }
        builder.skip((query.page - 1) * query.limit).take(query.limit);
        const [items, total] = await builder.getManyAndCount();
        return { items, total, page: query.page, limit: query.limit };
    }
    async findAllListings(query) {
        const builder = this.storeProductRepository
            .createQueryBuilder('listing')
            .innerJoinAndSelect('listing.store', 'store')
            .innerJoinAndSelect('listing.productVariant', 'variant')
            .innerJoinAndSelect('variant.product', 'product')
            .leftJoinAndSelect('listing.price', 'price')
            .where('store.status = :activeStore', {
            activeStore: store_status_enum_1.StoreStatus.ACTIVE,
        })
            .andWhere('listing.deletedAt IS NULL')
            .andWhere('listing.isActive = true')
            .andWhere('listing.status = :listingStatus', {
            listingStatus: store_product_status_enum_1.StoreProductStatus.ACTIVE,
        });
        if (query.search)
            builder.andWhere('(listing.title ILIKE :search OR listing.description ILIKE :search OR product.name ILIKE :search)', { search: `%${query.search.trim()}%` });
        if (query.storeId)
            builder.andWhere('listing.storeId = :storeId', {
                storeId: query.storeId,
            });
        if (query.productId)
            builder.andWhere('product.id = :productId', {
                productId: query.productId,
            });
        if (query.productVariantId)
            builder.andWhere('listing.productVariantId = :variantId', {
                variantId: query.productVariantId,
            });
        if (query.availabilityStatus)
            builder.andWhere('listing.availabilityStatus = :availabilityStatus', {
                availabilityStatus: query.availabilityStatus,
            });
        if (query.stockStatus)
            builder.andWhere('listing.stockStatus = :stockStatus', {
                stockStatus: query.stockStatus,
            });
        if (query.status)
            builder.andWhere('listing.status = :status', {
                status: query.status,
            });
        if (query.minPrice)
            builder.andWhere('price.amount >= :minPrice', {
                minPrice: query.minPrice,
            });
        if (query.maxPrice)
            builder.andWhere('price.amount <= :maxPrice', {
                maxPrice: query.maxPrice,
            });
        builder
            .orderBy('listing.createdAt', 'DESC')
            .skip((query.page - 1) * query.limit)
            .take(query.limit);
        const [items, total] = await builder.getManyAndCount();
        return { items, total, page: query.page, limit: query.limit };
    }
    async findListingById(id) {
        const listing = await this.storeProductRepository
            .createQueryBuilder('listing')
            .innerJoinAndSelect('listing.store', 'store')
            .innerJoinAndSelect('listing.productVariant', 'variant')
            .innerJoinAndSelect('variant.product', 'product')
            .leftJoinAndSelect('listing.price', 'price')
            .where('listing.id = :id', { id })
            .andWhere('listing.deletedAt IS NULL')
            .andWhere('listing.status = :activeStatus', {
            activeStatus: store_product_status_enum_1.StoreProductStatus.ACTIVE,
        })
            .andWhere('listing.isActive = true')
            .andWhere('store.status = :storeStatus', {
            storeStatus: store_status_enum_1.StoreStatus.ACTIVE,
        })
            .getOne();
        if (!listing)
            throw new common_1.NotFoundException('Store product listing not found');
        return listing;
    }
    async createListingWithoutStoreParam(dto) {
        if (!dto.storeId)
            throw new common_1.BadRequestException('storeId is required');
        return this.createListing(dto.storeId, dto);
    }
    async updateListingById(id, dto) {
        const listing = await this.storeProductRepository.findOneBy({ id });
        if (!listing)
            throw new common_1.NotFoundException('Store product listing not found');
        return this.updateListing(listing.storeId, id, dto);
    }
    async deactivateListingById(id) {
        const listing = await this.storeProductRepository.findOneBy({ id });
        if (!listing)
            throw new common_1.NotFoundException('Store product listing not found');
        return this.deactivateListing(listing.storeId, id);
    }
    async updatePriceByListingId(id, dto) {
        const listing = await this.storeProductRepository.findOneBy({ id });
        if (!listing)
            throw new common_1.NotFoundException('Store product listing not found');
        return this.updatePrice(listing.storeId, id, dto);
    }
    async createPrice(id, dto) {
        const listing = await this.storeProductRepository.findOne({
            where: { id },
            relations: { price: true },
        });
        if (!listing)
            throw new common_1.NotFoundException('Store product listing not found');
        if (listing.price)
            throw new common_1.ConflictException('Store product listing already has a price');
        const amount = this.validateMoney(dto.amount, 'amount');
        const originalAmount = dto.originalAmount == null
            ? null
            : this.validateMoney(dto.originalAmount, 'originalAmount');
        if (originalAmount !== null && Number(originalAmount) < Number(amount)) {
            throw new common_1.BadRequestException('originalAmount must be greater than or equal to amount');
        }
        return this.dataSource.transaction(async (manager) => {
            const priceRepo = manager.getRepository(price_entity_1.Price);
            const price = await priceRepo.save(priceRepo.create({
                storeProductId: id,
                amount,
                originalAmount,
                currency: dto.currency ?? 'IRR',
            }));
            await manager.getRepository(price_history_entity_1.PriceHistory).save(manager.getRepository(price_history_entity_1.PriceHistory).create({
                storeProductId: id,
                amount: price.amount,
                originalAmount: price.originalAmount,
                currency: price.currency,
            }));
            return price;
        });
    }
    async getPrice(id) {
        await this.findListingById(id);
        const price = await this.priceRepository.findOneBy({
            storeProductId: id,
        });
        if (!price)
            throw new common_1.NotFoundException('Price not found');
        return price;
    }
    async priceHistoryByListingId(id, query) {
        await this.findListingById(id);
        return this.priceHistoryWithQuery(id, query);
    }
    async findOne(id) {
        const store = await this.storeRepository.findOneBy({
            id,
            status: store_status_enum_1.StoreStatus.ACTIVE,
        });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        return store;
    }
    async findBySlug(slug) {
        const store = await this.storeRepository.findOneBy({
            slug,
            status: store_status_enum_1.StoreStatus.ACTIVE,
        });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        return store;
    }
    async update(id, dto) {
        const store = await this.storeRepository.findOneBy({ id });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        Object.assign(store, dto);
        return this.saveWithConflict(() => this.storeRepository.save(store), 'A store with this slug already exists');
    }
    async deactivate(id) {
        const store = await this.storeRepository.findOneBy({ id });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        store.status = store_status_enum_1.StoreStatus.SUSPENDED;
        await this.storeRepository.save(store);
        return { id, status: store_status_enum_1.StoreStatus.SUSPENDED };
    }
    async createListing(storeId, dto) {
        return this.dataSource.transaction(async (manager) => {
            const store = await manager.getRepository(store_entity_1.Store).findOneBy({
                id: storeId,
                status: store_status_enum_1.StoreStatus.ACTIVE,
            });
            if (!store)
                throw new common_1.BadRequestException('Store must be active to add listings');
            const variant = await manager.getRepository(product_variant_entity_1.ProductVariant).findOne({
                where: { id: dto.productVariantId, isActive: true },
                relations: { product: true },
            });
            if (!variant || variant.product.status !== product_status_enum_1.ProductStatus.ACTIVE) {
                throw new common_1.BadRequestException('An active product variant is required for a listing');
            }
            this.validateStock(dto.stockQuantity ?? null, dto.stockStatus ?? stock_status_enum_1.StockStatus.UNKNOWN);
            const amount = this.validateMoney(dto.currentPrice, 'currentPrice');
            const originalAmount = dto.originalPrice == null
                ? null
                : this.validateMoney(dto.originalPrice, 'originalPrice');
            if (originalAmount !== null && Number(originalAmount) < Number(amount)) {
                throw new common_1.BadRequestException('originalPrice must be greater than or equal to currentPrice');
            }
            const listingRepository = manager.getRepository(store_product_entity_1.StoreProduct);
            const listing = await this.saveWithConflict(() => listingRepository.save(listingRepository.create({
                storeId,
                productVariantId: variant.id,
                externalProductId: dto.externalProductId ?? null,
                externalUrl: dto.externalUrl ?? null,
                title: dto.title ?? null,
                description: dto.description ?? null,
                availabilityStatus: dto.availabilityStatus,
                stockStatus: dto.stockStatus,
                isActive: dto.isActive ?? true,
                stockQuantity: dto.stockQuantity ?? null,
                status: dto.status ?? store_product_status_enum_1.StoreProductStatus.ACTIVE,
            })), 'This store already has a listing for the variant or external product ID');
            const priceRepository = manager.getRepository(price_entity_1.Price);
            const price = await priceRepository.save(priceRepository.create({
                storeProductId: listing.id,
                amount,
                originalAmount,
                currency: dto.currency ?? 'IRR',
            }));
            await manager.getRepository(price_history_entity_1.PriceHistory).save(manager.getRepository(price_history_entity_1.PriceHistory).create({
                storeProductId: listing.id,
                amount: price.amount,
                originalAmount: price.originalAmount,
                currency: price.currency,
            }));
            return listingRepository.findOne({
                where: { id: listing.id },
                relations: {
                    store: true,
                    productVariant: { product: true },
                    price: true,
                },
            });
        });
    }
    async findListings(storeId, page = 1, limit = 20) {
        const store = await this.storeRepository.findOneBy({
            id: storeId,
            status: store_status_enum_1.StoreStatus.ACTIVE,
        });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        const builder = this.storeProductRepository
            .createQueryBuilder('listing')
            .innerJoinAndSelect('listing.productVariant', 'variant', 'variant.isActive = true')
            .innerJoinAndSelect('variant.product', 'product', 'product.status = :productStatus', {
            productStatus: product_status_enum_1.ProductStatus.ACTIVE,
        })
            .leftJoinAndSelect('listing.price', 'price')
            .where('listing.storeId = :storeId', { storeId })
            .andWhere('listing.isActive = true')
            .andWhere('listing.status = :listingStatus', {
            listingStatus: store_product_status_enum_1.StoreProductStatus.ACTIVE,
        })
            .andWhere('listing.deletedAt IS NULL')
            .orderBy('listing.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await builder.getManyAndCount();
        return { items, total, page, limit };
    }
    async findListing(storeId, listingId) {
        const listing = await this.storeProductRepository
            .createQueryBuilder('listing')
            .innerJoinAndSelect('listing.store', 'store', 'store.status = :storeStatus', {
            storeStatus: store_status_enum_1.StoreStatus.ACTIVE,
        })
            .innerJoinAndSelect('listing.productVariant', 'variant', 'variant.isActive = true')
            .innerJoinAndSelect('variant.product', 'product', 'product.status = :productStatus', {
            productStatus: product_status_enum_1.ProductStatus.ACTIVE,
        })
            .leftJoinAndSelect('listing.price', 'price')
            .where('listing.id = :listingId', { listingId })
            .andWhere('listing.storeId = :storeId', { storeId })
            .andWhere('listing.isActive = true')
            .getOne();
        if (!listing)
            throw new common_1.NotFoundException('Store product listing not found');
        return listing;
    }
    async updateListing(storeId, listingId, dto) {
        const listing = await this.storeProductRepository.findOneBy({
            id: listingId,
            storeId,
        });
        if (!listing)
            throw new common_1.NotFoundException('Store product listing not found');
        const stockQuantity = dto.stockQuantity === undefined ? listing.stockQuantity : dto.stockQuantity;
        const stockStatus = dto.stockStatus ?? listing.stockStatus;
        this.validateStock(stockQuantity, stockStatus);
        Object.assign(listing, dto);
        return this.saveWithConflict(() => this.storeProductRepository.save(listing), 'This store already has a listing for the external product ID');
    }
    async deactivateListing(storeId, listingId) {
        const listing = await this.storeProductRepository.findOneBy({
            id: listingId,
            storeId,
        });
        if (!listing)
            throw new common_1.NotFoundException('Store product listing not found');
        listing.isActive = false;
        await this.storeProductRepository.save(listing);
        return { id: listing.id, isActive: false };
    }
    async updatePrice(storeId, listingId, dto) {
        return this.dataSource.transaction(async (manager) => {
            const listing = await manager.getRepository(store_product_entity_1.StoreProduct).findOne({
                where: { id: listingId, storeId },
                relations: { price: true },
            });
            if (!listing)
                throw new common_1.NotFoundException('Store product listing not found');
            if (!listing.price)
                throw new common_1.ConflictException('Store product listing has no current price');
            const nextAmount = this.validateMoney(dto.amount, 'amount');
            const nextOriginal = dto.originalAmount === undefined
                ? listing.price.originalAmount
                : dto.originalAmount === null
                    ? null
                    : this.validateMoney(dto.originalAmount, 'originalAmount');
            if (nextOriginal !== null && Number(nextOriginal) < Number(nextAmount)) {
                throw new common_1.BadRequestException('originalAmount must be greater than or equal to amount');
            }
            const priceRepository = manager.getRepository(price_entity_1.Price);
            const price = listing.price;
            const nextCurrency = dto.currency ?? price.currency;
            if (price.amount === nextAmount &&
                price.originalAmount === nextOriginal &&
                price.currency === nextCurrency) {
                return price;
            }
            price.amount = nextAmount;
            price.originalAmount = nextOriginal;
            price.currency = nextCurrency;
            await priceRepository.save(price);
            await manager.getRepository(price_history_entity_1.PriceHistory).save(manager.getRepository(price_history_entity_1.PriceHistory).create({
                storeProductId: listingId,
                amount: price.amount,
                originalAmount: price.originalAmount,
                currency: price.currency,
            }));
            return price;
        });
    }
    async priceHistory(storeId, listingId, query) {
        await this.findListing(storeId, listingId);
        return this.priceHistoryWithQuery(listingId, query);
    }
    async priceHistoryWithQuery(listingId, query) {
        if (query.startDate &&
            query.endDate &&
            new Date(query.startDate) > new Date(query.endDate)) {
            throw new common_1.BadRequestException('startDate must be before or equal to endDate');
        }
        const builder = this.priceHistoryRepository
            .createQueryBuilder('history')
            .where('history.storeProductId = :listingId', { listingId })
            .orderBy('history.recordedAt', query.sort);
        if (query.startDate)
            builder.andWhere('history.recordedAt >= :startDate', {
                startDate: query.startDate,
            });
        if (query.endDate)
            builder.andWhere('history.recordedAt <= :endDate', {
                endDate: query.endDate,
            });
        builder.skip((query.page - 1) * query.limit).take(query.limit);
        const [items, total] = await builder.getManyAndCount();
        return { items, total, page: query.page, limit: query.limit };
    }
    validateMoney(value, field) {
        const normalized = value.trim();
        if (!/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/.test(normalized)) {
            throw new common_1.BadRequestException(`${field} must be a decimal value`);
        }
        if (Number(normalized) <= 0)
            throw new common_1.BadRequestException(`${field} must be greater than zero`);
        return normalized.includes('.') ? normalized : `${normalized}.000000`;
    }
    validateStock(stockQuantity, stockStatus) {
        if (stockQuantity !== null &&
            stockStatus === stock_status_enum_1.StockStatus.OUT_OF_STOCK &&
            stockQuantity !== 0) {
            throw new common_1.BadRequestException('OUT_OF_STOCK listings must have stockQuantity 0');
        }
        if (stockQuantity !== null && stockStatus === stock_status_enum_1.StockStatus.IN_STOCK && stockQuantity <= 0) {
            throw new common_1.BadRequestException('IN_STOCK listings must have positive stockQuantity');
        }
    }
    async saveWithConflict(save, message) {
        try {
            return await save();
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError &&
                error.driverError &&
                typeof error.driverError === 'object' &&
                error.driverError !== null &&
                'code' in error.driverError &&
                error.driverError.code === '23505') {
                throw new common_1.ConflictException(message);
            }
            throw error;
        }
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(1, (0, typeorm_1.InjectRepository)(store_product_entity_1.StoreProduct)),
    __param(2, (0, typeorm_1.InjectRepository)(product_variant_entity_1.ProductVariant)),
    __param(3, (0, typeorm_1.InjectRepository)(price_entity_1.Price)),
    __param(4, (0, typeorm_1.InjectRepository)(price_history_entity_1.PriceHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], StoresService);
//# sourceMappingURL=stores.service.js.map