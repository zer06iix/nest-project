import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { ProductStatus } from '../products/enums/product-status.enum';
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

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
        @InjectRepository(StoreProduct)
        private readonly storeProductRepository: Repository<StoreProduct>,
        @InjectRepository(ProductVariant)
        private readonly variantRepository: Repository<ProductVariant>,
        @InjectRepository(Price)
        private readonly priceRepository: Repository<Price>,
        @InjectRepository(PriceHistory)
        private readonly priceHistoryRepository: Repository<PriceHistory>,
        private readonly dataSource: DataSource,
    ) {}

    async create(dto: CreateStoreDto) {
        return this.saveWithConflict(
            () => this.storeRepository.save(this.storeRepository.create({
                ...dto,
                status: dto.status ?? StoreStatus.PENDING,
            })),
            'A store with this slug already exists',
        );
    }

    async findAll(query: QueryStoresDto, includeNonActive = false) {
        const builder = this.storeRepository.createQueryBuilder('store')
            .orderBy('store.createdAt', 'DESC');
        if (includeNonActive) {
            if (query.status) builder.where('store.status = :status', { status: query.status });
        } else {
            builder.where('store.status = :activeStatus', { activeStatus: StoreStatus.ACTIVE });
        }
        if (query.search) {
            builder.andWhere('store.name ILIKE :search', { search: `%${query.search.trim()}%` });
        }
        builder.skip((query.page - 1) * query.limit).take(query.limit);
        const [items, total] = await builder.getManyAndCount();
        return { items, total, page: query.page, limit: query.limit };
    }

    async findOne(id: string) {
        const store = await this.storeRepository.findOneBy({ id, status: StoreStatus.ACTIVE });
        if (!store) throw new NotFoundException('Store not found');
        return store;
    }

    async findBySlug(slug: string) {
        const store = await this.storeRepository.findOneBy({ slug, status: StoreStatus.ACTIVE });
        if (!store) throw new NotFoundException('Store not found');
        return store;
    }

    async update(id: string, dto: UpdateStoreDto) {
        const store = await this.storeRepository.findOneBy({ id });
        if (!store) throw new NotFoundException('Store not found');
        Object.assign(store, dto);
        return this.saveWithConflict(
            () => this.storeRepository.save(store),
            'A store with this slug already exists',
        );
    }

    async deactivate(id: string) {
        const store = await this.storeRepository.findOneBy({ id });
        if (!store) throw new NotFoundException('Store not found');
        store.status = StoreStatus.SUSPENDED;
        await this.storeRepository.save(store);
        return { id, status: StoreStatus.SUSPENDED };
    }

    async createListing(storeId: string, dto: CreateStoreProductDto) {
        return this.dataSource.transaction(async (manager) => {
            const store = await manager.getRepository(Store).findOneBy({
                id: storeId,
                status: StoreStatus.ACTIVE,
            });
            if (!store) throw new BadRequestException('Store must be active to add listings');
            const variant = await manager.getRepository(ProductVariant).findOne({
                where: { id: dto.productVariantId, isActive: true },
                relations: { product: true },
            });
            if (!variant || variant.product.status !== ProductStatus.ACTIVE) {
                throw new BadRequestException('An active product variant is required for a listing');
            }

            const listingRepository = manager.getRepository(StoreProduct);
            const listing = await this.saveWithConflict(
                () => listingRepository.save(listingRepository.create({
                    storeId,
                    productVariantId: variant.id,
                    externalProductId: dto.externalProductId ?? null,
                    externalUrl: dto.externalUrl,
                    title: dto.title ?? null,
                    description: dto.description ?? null,
                    availabilityStatus: dto.availabilityStatus,
                    stockStatus: dto.stockStatus,
                    isActive: dto.isActive ?? true,
                })),
                'This store already has a listing for the variant or external product ID',
            );

            const priceRepository = manager.getRepository(Price);
            const price = await priceRepository.save(priceRepository.create({
                storeProductId: listing.id,
                amount: String(dto.currentPrice),
                originalAmount: dto.originalPrice == null ? null : String(dto.originalPrice),
                currency: dto.currency ?? 'IRR',
            }));
            await manager.getRepository(PriceHistory).save(
                manager.getRepository(PriceHistory).create({
                    storeProductId: listing.id,
                    amount: price.amount,
                    originalAmount: price.originalAmount,
                    currency: price.currency,
                }),
            );
            return listingRepository.findOne({
                where: { id: listing.id },
                relations: { store: true, productVariant: { product: true }, price: true },
            });
        });
    }

    async findListings(storeId: string, page = 1, limit = 20) {
        const store = await this.storeRepository.findOneBy({ id: storeId, status: StoreStatus.ACTIVE });
        if (!store) throw new NotFoundException('Store not found');
        const builder = this.storeProductRepository.createQueryBuilder('listing')
            .innerJoinAndSelect('listing.productVariant', 'variant', 'variant.isActive = true')
            .innerJoinAndSelect('variant.product', 'product', 'product.status = :productStatus', {
                productStatus: ProductStatus.ACTIVE,
            })
            .leftJoinAndSelect('listing.price', 'price')
            .where('listing.storeId = :storeId', { storeId })
            .andWhere('listing.isActive = true')
            .orderBy('listing.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await builder.getManyAndCount();
        return { items, total, page, limit };
    }

    async findListing(storeId: string, listingId: string) {
        const listing = await this.storeProductRepository.createQueryBuilder('listing')
            .innerJoinAndSelect('listing.store', 'store', 'store.status = :storeStatus', {
                storeStatus: StoreStatus.ACTIVE,
            })
            .innerJoinAndSelect('listing.productVariant', 'variant', 'variant.isActive = true')
            .innerJoinAndSelect('variant.product', 'product', 'product.status = :productStatus', {
                productStatus: ProductStatus.ACTIVE,
            })
            .leftJoinAndSelect('listing.price', 'price')
            .where('listing.id = :listingId', { listingId })
            .andWhere('listing.storeId = :storeId', { storeId })
            .andWhere('listing.isActive = true')
            .getOne();
        if (!listing) throw new NotFoundException('Store product listing not found');
        return listing;
    }

    async updateListing(storeId: string, listingId: string, dto: UpdateStoreProductDto) {
        const listing = await this.storeProductRepository.findOneBy({ id: listingId, storeId });
        if (!listing) throw new NotFoundException('Store product listing not found');
        Object.assign(listing, dto);
        return this.saveWithConflict(
            () => this.storeProductRepository.save(listing),
            'This store already has a listing for the external product ID',
        );
    }

    async deactivateListing(storeId: string, listingId: string) {
        const listing = await this.storeProductRepository.findOneBy({ id: listingId, storeId });
        if (!listing) throw new NotFoundException('Store product listing not found');
        listing.isActive = false;
        await this.storeProductRepository.save(listing);
        return { id: listing.id, isActive: false };
    }

    async updatePrice(storeId: string, listingId: string, dto: UpdateStoreProductPriceDto) {
        return this.dataSource.transaction(async (manager) => {
            const listing = await manager.getRepository(StoreProduct).findOne({
                where: { id: listingId, storeId },
                relations: { price: true },
            });
            if (!listing) throw new NotFoundException('Store product listing not found');
            if (!listing.price) throw new ConflictException('Store product listing has no current price');

            const priceRepository = manager.getRepository(Price);
            const price = listing.price;
            const nextAmount = String(dto.amount);
            const nextOriginal = dto.originalAmount === undefined
                ? price.originalAmount
                : dto.originalAmount === null ? null : String(dto.originalAmount);
            const nextCurrency = dto.currency ?? price.currency;
            if (
                price.amount === nextAmount &&
                price.originalAmount === nextOriginal &&
                price.currency === nextCurrency
            ) {
                return price;
            }

            price.amount = nextAmount;
            price.originalAmount = nextOriginal;
            price.currency = nextCurrency;
            await priceRepository.save(price);
            await manager.getRepository(PriceHistory).save(
                manager.getRepository(PriceHistory).create({
                    storeProductId: listingId,
                    amount: price.amount,
                    originalAmount: price.originalAmount,
                    currency: price.currency,
                }),
            );
            return price;
        });
    }

    async priceHistory(storeId: string, listingId: string, query: QueryPriceHistoryDto) {
        await this.findListing(storeId, listingId);
        const [items, total] = await this.priceHistoryRepository.findAndCount({
            where: { storeProductId: listingId },
            order: { recordedAt: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { items, total, page: query.page, limit: query.limit };
    }

    private async saveWithConflict<T>(save: () => Promise<T>, message: string): Promise<T> {
        try {
            return await save();
        } catch (error) {
            if (error instanceof QueryFailedError && error.driverError.code === '23505') {
                throw new ConflictException(message);
            }
            throw error;
        }
    }
}
