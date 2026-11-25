import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, QueryFailedError, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CategoryAttribute } from '../attributes/entities/category-attribute.entity';
import { Attribute } from '../attributes/entities/attribute.entity';
import { AttributeOption } from '../attributes/entities/attribute-option.entity';
import { AttributeDataType } from '../attributes/enums/attribute-datatype.enum';
import { StoreProduct } from '../stores/entities/store-product.entity';
import { Store } from '../stores/entities/store.entity';
import { Price } from '../stores/entities/price.entity';
import { StoreStatus } from '../stores/enums/store-status.enum';
import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { VariantAttributeValue } from './entities/variant-attribute-value.entity';
import { ProductIdentifier } from './entities/product-identifier.entity';
import { ProductStatus } from './enums/product-status.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto, ProductSort } from './dto/query-products.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { ReorderProductImagesDto } from './dto/reorder-product-images.dto';
import { CreateProductIdentifierDto } from './dto/create-product-identifier.dto';
import { QueryProductIdentifiersDto } from './dto/query-product-identifiers.dto';
import { AttributeValueDto } from './dto/attribute-value.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
        @InjectRepository(ProductVariant)
        private readonly variantRepository: Repository<ProductVariant>,
        @InjectRepository(ProductImage)
        private readonly imageRepository: Repository<ProductImage>,
        @InjectRepository(ProductAttributeValue)
        private readonly productValueRepository: Repository<ProductAttributeValue>,
        @InjectRepository(VariantAttributeValue)
        private readonly variantValueRepository: Repository<VariantAttributeValue>,
        @InjectRepository(ProductIdentifier)
        private readonly identifierRepository: Repository<ProductIdentifier>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(CategoryAttribute)
        private readonly categoryAttributeRepository: Repository<CategoryAttribute>,
        @InjectRepository(Attribute)
        private readonly attributeRepository: Repository<Attribute>,
        @InjectRepository(AttributeOption)
        private readonly optionRepository: Repository<AttributeOption>,
        @InjectRepository(StoreProduct)
        private readonly storeProductRepository: Repository<StoreProduct>,
        private readonly dataSource: DataSource,
    ) {}

    async create(dto: CreateProductDto) {
        return this.dataSource.transaction(async (manager) => {
            const products = manager.getRepository(Product);
            await this.assertActiveCategory(dto.categoryId, manager.getRepository(Category));
            await this.assertBrand(dto.brandId, manager.getRepository(Brand));
            if ((dto.status ?? ProductStatus.DRAFT) !== ProductStatus.DRAFT) {
                throw new BadRequestException(
                    'Create products as drafts, add variants, then publish',
                );
            }

            const product = await this.saveWithConflict(
                () =>
                    products.save(
                        products.create({
                            name: dto.name,
                            slug: dto.slug,
                            description: dto.description ?? null,
                            categoryId: dto.categoryId,
                            brandId: dto.brandId ?? null,
                            status: ProductStatus.DRAFT,
                        }),
                    ),
                'A product with this slug already exists',
            );

            if (dto.attributes?.length) {
                const values = await this.buildAttributeValues(
                    dto.categoryId,
                    dto.attributes,
                    false,
                    product.id,
                    manager.getRepository(CategoryAttribute),
                    manager.getRepository(Attribute),
                    manager.getRepository(AttributeOption),
                );
                await manager.getRepository(ProductAttributeValue).save(values);
            }

            return products.findOne({
                where: { id: product.id },
                relations: {
                    category: true,
                    brand: true,
                    attributeValues: { attribute: true, option: true },
                },
            });
        });
    }

    async findAll(query: QueryProductsDto, includeUnpublished = false) {
        const builder = this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.images', 'image');
        if (includeUnpublished) {
            builder.withDeleted();
            if (query.status)
                builder.where('product.status = :requestedStatus', {
                    requestedStatus: query.status,
                });
        } else {
            builder.where('product.status = :publicStatus', {
                publicStatus: ProductStatus.ACTIVE,
            });
        }

        if (query.search) {
            builder.andWhere(
                `(
                    product.name ILIKE :search
                    OR brand.name ILIKE :search
                    OR category.name ILIKE :search
                    OR EXISTS (
                        SELECT 1
                        FROM product_attribute_values AS search_value
                        LEFT JOIN attribute_options AS search_option ON search_option.id = search_value.option_id
                        WHERE search_value.product_id = product.id
                            AND (
                                search_value.value_text ILIKE :search
                                OR search_value.value_number::text ILIKE :search
                                OR search_value.value_boolean::text ILIKE :search
                                OR search_value.value_date::text ILIKE :search
                                OR search_option.label ILIKE :search
                                OR search_option.value ILIKE :search
                            )
                    )
                )`,
                { search: `%${query.search.trim()}%` },
            );
        }
        if (query.categoryId)
            builder.andWhere('product.categoryId = :categoryId', {
                categoryId: query.categoryId,
            });
        if (query.brandId)
            builder.andWhere('product.brandId = :brandId', {
                brandId: query.brandId,
            });

        if (
            query.minPrice !== undefined ||
            query.maxPrice !== undefined ||
            query.availabilityStatus ||
            query.stockStatus ||
            query.storeId
        ) {
            builder
                .innerJoin('product.variants', 'priceVariant', 'priceVariant.isActive = true')
                .innerJoin(
                    'priceVariant.storeProducts',
                    'listing',
                    'listing.isActive = true AND listing.availabilityStatus = :availableStatus',
                    {
                        availableStatus: query.availabilityStatus ?? 'AVAILABLE',
                    },
                )
                .innerJoin(
                    'listing.store',
                    'listingStore',
                    'listingStore.status = :activeStoreStatus',
                    {
                        activeStoreStatus: StoreStatus.ACTIVE,
                    },
                )
                .innerJoin('listing.price', 'price');
            if (query.storeId)
                builder.andWhere('listing.storeId = :storeId', {
                    storeId: query.storeId,
                });
            if (query.stockStatus) {
                builder.andWhere('listing.stockStatus = :stockStatus', {
                    stockStatus: query.stockStatus,
                });
            }
            if (query.minPrice !== undefined) {
                builder.andWhere('price.amount >= :minPrice', {
                    minPrice: String(query.minPrice),
                });
            }
            if (query.maxPrice !== undefined) {
                builder.andWhere('price.amount <= :maxPrice', {
                    maxPrice: String(query.maxPrice),
                });
            }
        }

        if (query.attributeId && query.attributeValue !== undefined) {
            if (!query.categoryId) {
                throw new BadRequestException(
                    'Filterable attribute must be assigned to the selected category',
                );
            }
            const config = await this.categoryAttributeRepository.findOneBy({
                categoryId: query.categoryId,
                attributeId: query.attributeId,
                isFilterable: true,
            });
            if (!config) {
                throw new BadRequestException(
                    'Filterable attribute must be assigned to the selected category',
                );
            }
            builder
                .andWhere((qb) => {
                    const subquery = qb
                        .subQuery()
                        .select('1')
                        .from(ProductAttributeValue, 'filterValue')
                        .leftJoin('filterValue.option', 'filterOption')
                        .where('filterValue.productId = product.id')
                        .andWhere('filterValue.attributeId = :filterAttributeId')
                        .andWhere(
                            `(
                        filterValue.valueText = :filterValue
                        OR filterValue.valueNumber::text = :filterValue
                        OR filterValue.valueBoolean::text = :filterValue
                        OR filterValue.valueDate::text = :filterValue
                        OR filterOption.value = :filterValue
                    )`,
                        )
                        .getQuery();
                    return `EXISTS ${subquery}`;
                })
                .setParameters({
                    filterAttributeId: query.attributeId,
                    filterValue: query.attributeValue,
                });
        }

        if (query.sortBy === ProductSort.PRICE) {
            builder
                .addSelect(
                    (subquery) =>
                        subquery
                            .select('MIN(sortPrice.amount)')
                            .from(StoreProduct, 'sortListing')
                            .innerJoin(
                                ProductVariant,
                                'sortVariant',
                                'sortVariant.id = sortListing.productVariantId AND sortVariant.isActive = true',
                            )
                            .innerJoin(
                                Price,
                                'sortPrice',
                                'sortPrice.storeProductId = sortListing.id',
                            )
                            .innerJoin(
                                Store,
                                'sortStore',
                                'sortStore.id = sortListing.storeId AND sortStore.status = :sortStoreStatus',
                            )
                            .where('sortVariant.productId = product.id')
                            .andWhere('sortListing.isActive = true')
                            .andWhere('sortListing.availabilityStatus = :sortAvailability'),
                    'minimum_price',
                )
                .setParameter('sortStoreStatus', StoreStatus.ACTIVE)
                .setParameter('sortAvailability', 'AVAILABLE')
                .orderBy('minimum_price', query.sortOrder, 'NULLS LAST')
                .addOrderBy('product.createdAt', 'DESC');
        } else {
            builder.orderBy(
                query.sortBy === ProductSort.NAME ? 'product.name' : 'product.createdAt',
                query.sortOrder,
            );
        }

        builder.skip((query.page - 1) * query.limit).take(query.limit);
        const [items, total] = await builder.getManyAndCount();
        return { items, total, page: query.page, limit: query.limit };
    }

    async findOne(id: string) {
        const product = await this.productRepository.findOne({
            where: { id, status: ProductStatus.ACTIVE },
            relations: {
                category: true,
                brand: true,
                variants: {
                    attributeValues: { attribute: true, option: true },
                },
                images: true,
                attributeValues: { attribute: true, option: true },
            },
        });
        if (!product) throw new NotFoundException('Product not found');
        product.variants = product.variants
            .filter((variant) => variant.isActive)
            .sort((left, right) => left.sortOrder - right.sortOrder);
        return product;
    }

    async findAdminOne(id: string) {
        const product = await this.productRepository.findOne({
            where: { id },
            withDeleted: true,
            relations: {
                category: true,
                brand: true,
                variants: {
                    attributeValues: { attribute: true, option: true },
                },
                images: true,
                attributeValues: { attribute: true, option: true },
            },
        });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async findBySlug(slug: string) {
        const product = await this.productRepository.findOne({
            where: { slug, status: ProductStatus.ACTIVE },
            relations: {
                category: true,
                brand: true,
                variants: {
                    attributeValues: { attribute: true, option: true },
                },
                images: true,
                attributeValues: { attribute: true, option: true },
            },
        });
        if (!product) throw new NotFoundException('Product not found');
        product.variants = product.variants
            .filter((variant) => variant.isActive)
            .sort((left, right) => left.sortOrder - right.sortOrder);
        return product;
    }

    async update(id: string, dto: UpdateProductDto) {
        return this.dataSource.transaction(async (manager) => {
            const products = manager.getRepository(Product);
            const product = await products.findOneBy({ id });
            if (!product) throw new NotFoundException('Product not found');
            if (dto.categoryId)
                await this.assertActiveCategory(dto.categoryId, manager.getRepository(Category));
            if (dto.categoryId && dto.categoryId !== product.categoryId) {
                const hasProductValues = await manager
                    .getRepository(ProductAttributeValue)
                    .existsBy({ productId: product.id });
                const hasVariants = await manager
                    .getRepository(ProductVariant)
                    .existsBy({ productId: product.id });
                if (hasProductValues || hasVariants) {
                    throw new BadRequestException(
                        'Remove existing attribute values and variants before changing the product category',
                    );
                }
            }
            if (dto.brandId !== undefined)
                await this.assertBrand(dto.brandId, manager.getRepository(Brand));
            if (dto.slug && dto.slug !== product.slug) {
                if (await products.existsBy({ slug: dto.slug })) {
                    throw new ConflictException('A product with this slug already exists');
                }
            }

            if (dto.attributes !== undefined) {
                const values = await this.buildAttributeValues(
                    dto.categoryId ?? product.categoryId,
                    dto.attributes,
                    false,
                    product.id,
                    manager.getRepository(CategoryAttribute),
                    manager.getRepository(Attribute),
                    manager.getRepository(AttributeOption),
                );
                await manager
                    .getRepository(ProductAttributeValue)
                    .delete({ productId: product.id });
                if (values.length) await manager.getRepository(ProductAttributeValue).save(values);
            }

            Object.assign(product, {
                name: dto.name ?? product.name,
                slug: dto.slug ?? product.slug,
                description: dto.description === undefined ? product.description : dto.description,
                categoryId: dto.categoryId ?? product.categoryId,
                brandId: dto.brandId === undefined ? product.brandId : dto.brandId,
            });

            if (dto.status === ProductStatus.ACTIVE) {
                await this.assertPublishable(product, manager);
            }
            if (dto.status) product.status = dto.status;
            await this.saveWithConflict(
                () => products.save(product),
                'A product with this slug already exists',
            );
            return this.findProductById(product.id);
        });
    }

    async remove(id: string) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) throw new NotFoundException('Product not found');
        product.status = ProductStatus.ARCHIVED;
        await this.productRepository.save(product);
        await this.productRepository.softDelete({ id });
        return { id, status: ProductStatus.ARCHIVED };
    }

    async createVariant(productId: string, dto: CreateProductVariantDto) {
        return this.dataSource.transaction(async (manager) => {
            const product = await manager.getRepository(Product).findOneBy({ id: productId });
            if (!product) throw new NotFoundException('Product not found');
            const variants = manager.getRepository(ProductVariant);
            if (dto.isDefault) {
                await variants.update({ productId }, { isDefault: false });
            }
            const variant = await variants.save(
                variants.create({
                    productId,
                    title: dto.title,
                    sku: dto.sku ?? null,
                    isDefault: dto.isDefault ?? false,
                    isActive: dto.isActive ?? true,
                    sortOrder: dto.sortOrder ?? 0,
                }),
            );
            if (dto.attributes?.length) {
                const values = await this.buildAttributeValues(
                    product.categoryId,
                    dto.attributes,
                    true,
                    variant.id,
                    manager.getRepository(CategoryAttribute),
                    manager.getRepository(Attribute),
                    manager.getRepository(AttributeOption),
                );
                await manager.getRepository(VariantAttributeValue).save(values);
            }
            if (product.status === ProductStatus.ACTIVE) {
                await this.assertPublishable(product, manager);
            }
            return variants.findOne({
                where: { id: variant.id },
                relations: {
                    attributeValues: { attribute: true, option: true },
                },
            });
        });
    }

    async findVariants(productId: string) {
        await this.findOne(productId);
        return this.variantRepository.find({
            where: { productId, isActive: true },
            relations: { attributeValues: { attribute: true, option: true } },
            order: { sortOrder: 'ASC', createdAt: 'ASC' },
        });
    }

    async findVariant(productId: string, variantId: string) {
        await this.findOne(productId);
        const variant = await this.variantRepository.findOne({
            where: { id: variantId, productId, isActive: true },
            relations: { attributeValues: { attribute: true, option: true } },
        });
        if (!variant) throw new NotFoundException('Product variant not found');
        return variant;
    }

    async updateVariant(productId: string, variantId: string, dto: UpdateProductVariantDto) {
        return this.dataSource.transaction(async (manager) => {
            const variants = manager.getRepository(ProductVariant);
            const variant = await variants.findOneBy({
                id: variantId,
                productId,
            });
            if (!variant) throw new NotFoundException('Product variant not found');
            const product = await manager.getRepository(Product).findOneBy({ id: productId });
            if (!product) throw new NotFoundException('Product not found');
            if (dto.isDefault) await variants.update({ productId }, { isDefault: false });
            if (dto.attributes !== undefined) {
                const values = await this.buildAttributeValues(
                    product.categoryId,
                    dto.attributes,
                    true,
                    variant.id,
                    manager.getRepository(CategoryAttribute),
                    manager.getRepository(Attribute),
                    manager.getRepository(AttributeOption),
                );
                await manager.getRepository(VariantAttributeValue).delete({ variantId });
                if (values.length) await manager.getRepository(VariantAttributeValue).save(values);
            }
            Object.assign(variant, {
                title: dto.title ?? variant.title,
                sku: dto.sku === undefined ? variant.sku : dto.sku,
                isDefault: dto.isDefault ?? variant.isDefault,
                isActive: dto.isActive ?? variant.isActive,
                sortOrder: dto.sortOrder ?? variant.sortOrder,
            });
            const updated = await variants.save(variant);
            if (product.status === ProductStatus.ACTIVE) {
                await this.assertPublishable(product, manager);
            }
            return updated;
        });
    }

    async removeVariant(productId: string, variantId: string) {
        return this.dataSource.transaction(async (manager) => {
            const variant = await manager
                .getRepository(ProductVariant)
                .findOneBy({ id: variantId, productId });
            if (!variant) throw new NotFoundException('Product variant not found');
            if (
                await manager
                    .getRepository(StoreProduct)
                    .existsBy({ productVariantId: variantId, isActive: true })
            ) {
                throw new ConflictException(
                    'Deactivate store listings before removing this variant',
                );
            }
            const product = await manager.getRepository(Product).findOneBy({ id: productId });
            if (!product) throw new NotFoundException('Product not found');
            await manager.getRepository(ProductVariant).remove(variant);
            if (product.status === ProductStatus.ACTIVE) {
                await this.assertPublishable(product, manager);
            }
            return { id: variantId };
        });
    }

    async replaceProductAttributes(productId: string, values: AttributeValueDto[]) {
        return this.dataSource.transaction(async (manager) => {
            const product = await manager.getRepository(Product).findOneBy({ id: productId });
            if (!product) throw new NotFoundException('Product not found');
            const repository = manager.getRepository(ProductAttributeValue);
            const prepared = await this.buildAttributeValues(
                product.categoryId,
                values,
                false,
                productId,
                manager.getRepository(CategoryAttribute),
                manager.getRepository(Attribute),
                manager.getRepository(AttributeOption),
            );
            await repository.delete({ productId });
            if (prepared.length) await repository.save(prepared);
            if (product.status === ProductStatus.ACTIVE)
                await this.assertPublishable(product, manager);
            return repository.find({
                where: { productId },
                relations: { attribute: true, option: true },
            });
        });
    }

    async getProductAttributes(productId: string) {
        await this.findOne(productId);
        return this.productValueRepository.find({
            where: { productId },
            relations: { attribute: true, option: true },
            order: { createdAt: 'ASC' },
        });
    }

    async replaceVariantAttributes(
        productId: string,
        variantId: string,
        values: AttributeValueDto[],
    ) {
        return this.dataSource.transaction(async (manager) => {
            const product = await manager.getRepository(Product).findOneBy({ id: productId });
            if (!product) throw new NotFoundException('Product not found');
            const variant = await manager
                .getRepository(ProductVariant)
                .findOneBy({ id: variantId, productId });
            if (!variant) throw new NotFoundException('Product variant not found');
            const repository = manager.getRepository(VariantAttributeValue);
            const prepared = await this.buildAttributeValues(
                product.categoryId,
                values,
                true,
                variantId,
                manager.getRepository(CategoryAttribute),
                manager.getRepository(Attribute),
                manager.getRepository(AttributeOption),
            );
            await repository.delete({ variantId });
            if (prepared.length) await repository.save(prepared);
            if (product.status === ProductStatus.ACTIVE)
                await this.assertPublishable(product, manager);
            return repository.find({
                where: { variantId },
                relations: { attribute: true, option: true },
            });
        });
    }

    async createImage(productId: string, dto: CreateProductImageDto) {
        return this.dataSource.transaction(async (manager) => {
            const product = await manager.getRepository(Product).findOneBy({ id: productId });
            if (!product) throw new NotFoundException('Product not found');
            const images = manager.getRepository(ProductImage);
            const hasPrimary = await images.existsBy({
                productId,
                isPrimary: true,
            });
            const isPrimary = dto.isPrimary ?? !hasPrimary;
            if (isPrimary) await images.update({ productId }, { isPrimary: false });
            return images.save(
                images.create({
                    productId,
                    url: dto.url,
                    altText: dto.altText ?? null,
                    isPrimary,
                    sortOrder: dto.sortOrder ?? 0,
                }),
            );
        });
    }

    async removeImage(productId: string, imageId: string) {
        return this.dataSource.transaction(async (manager) => {
            const images = manager.getRepository(ProductImage);
            const image = await images.findOneBy({ id: imageId, productId });
            if (!image) throw new NotFoundException('Product image not found');
            await images.remove(image);
            if (image.isPrimary) {
                const nextImage = await images.findOne({
                    where: { productId },
                    order: { sortOrder: 'ASC', createdAt: 'ASC' },
                });
                if (nextImage) {
                    nextImage.isPrimary = true;
                    await images.save(nextImage);
                }
            }
            return { id: imageId };
        });
    }

    async setPrimaryImage(productId: string, imageId: string) {
        return this.dataSource.transaction(async (manager) => {
            const images = manager.getRepository(ProductImage);
            const image = await images.findOneBy({ id: imageId, productId });
            if (!image) throw new NotFoundException('Product image not found');
            await images.update({ productId }, { isPrimary: false });
            image.isPrimary = true;
            return images.save(image);
        });
    }

    async reorderImages(productId: string, dto: ReorderProductImagesDto) {
        return this.dataSource.transaction(async (manager) => {
            const images = manager.getRepository(ProductImage);
            const uniqueIds = new Set(dto.images.map((image) => image.imageId));
            if (uniqueIds.size !== dto.images.length)
                throw new BadRequestException('Duplicate image IDs');
            const rows = await images.findBy({
                productId,
                id: In(dto.images.map((image) => image.imageId)),
            });
            if (rows.length !== dto.images.length) {
                throw new BadRequestException('Every image must belong to this product');
            }
            for (const item of dto.images) {
                await images.update({ id: item.imageId, productId }, { sortOrder: item.sortOrder });
            }
            return images.find({
                where: { productId },
                order: { sortOrder: 'ASC' },
            });
        });
    }

    async createIdentifier(productId: string, dto: CreateProductIdentifierDto) {
        if (!(await this.productRepository.existsBy({ id: productId }))) {
            throw new NotFoundException('Product not found');
        }
        const repository = this.identifierRepository;
        return this.saveWithConflict(
            () => repository.save(repository.create({ productId, ...dto })),
            'This product identifier is already registered',
        );
    }

    async findIdentifiers(productId: string, query: QueryProductIdentifiersDto) {
        if (
            !(await this.productRepository.existsBy({
                id: productId,
                status: ProductStatus.ACTIVE,
            }))
        ) {
            throw new NotFoundException('Product not found');
        }
        return this.identifierRepository.find({
            where: { productId, ...(query.type ? { type: query.type } : {}) },
            order: { createdAt: 'ASC' },
        });
    }

    async removeIdentifier(productId: string, identifierId: string) {
        const result = await this.identifierRepository.delete({
            id: identifierId,
            productId,
        });
        if (!result.affected) throw new NotFoundException('Product identifier not found');
        return { id: identifierId };
    }

    async findStoreListings(productId: string, variantId?: string) {
        const query = this.storeProductRepository
            .createQueryBuilder('listing')
            .innerJoinAndSelect('listing.store', 'store', 'store.status = :storeStatus', {
                storeStatus: StoreStatus.ACTIVE,
            })
            .innerJoinAndSelect('listing.productVariant', 'variant')
            .innerJoinAndSelect('variant.product', 'product', 'product.id = :productId', {
                productId,
            })
            .leftJoinAndSelect('listing.price', 'price')
            .where('listing.isActive = true')
            .andWhere('product.status = :productStatus', {
                productStatus: ProductStatus.ACTIVE,
            })
            .orderBy('price.amount', 'ASC', 'NULLS LAST');
        if (variantId) query.andWhere('variant.id = :variantId', { variantId });
        const listings = await query.getMany();
        if (
            !(await this.productRepository.existsBy({
                id: productId,
                status: ProductStatus.ACTIVE,
            }))
        ) {
            throw new NotFoundException('Product not found');
        }
        return listings;
    }

    async getPriceComparison(productId: string, sort = 'lowestPrice') {
        const listings = await this.findStoreListings(productId);
        const offers = listings.map((listing) => {
            const amount = listing.price ? Number(listing.price.amount) : null;
            const originalAmount = listing.price?.originalAmount
                ? Number(listing.price.originalAmount)
                : null;
            const discountPercentage =
                amount !== null && originalAmount !== null && originalAmount > 0
                    ? Math.round(((originalAmount - amount) / originalAmount) * 100)
                    : null;
            return {
                store: {
                    id: listing.store.id,
                    name: listing.store.name,
                    logo: listing.store.logo,
                },
                storeProductId: listing.id,
                productVariant: listing.productVariant,
                currentPrice: listing.price?.amount ?? null,
                originalPrice: listing.price?.originalAmount ?? null,
                currency: listing.price?.currency ?? null,
                discountPercentage,
                availability: listing.availabilityStatus,
                stockStatus: listing.stockStatus,
                lastPriceUpdate: listing.price?.updatedAt ?? null,
            };
        });
        offers.sort((a, b) => {
            if (a.currentPrice === null) return 1;
            if (b.currentPrice === null) return -1;
            return sort === 'highestPrice'
                ? Number(b.currentPrice) - Number(a.currentPrice)
                : Number(a.currentPrice) - Number(b.currentPrice);
        });
        const variants = new Map<string, typeof offers>();
        for (const offer of offers) {
            const variantId = offer.productVariant.id;
            if (!variants.has(variantId)) variants.set(variantId, []);
            variants.get(variantId)?.push(offer);
        }
        return {
            variants: Array.from(variants.entries()).map(([variantId, items]) => ({
                variantId,
                offers: items,
            })),
        };
    }

    private async buildAttributeValues<T extends ProductAttributeValue | VariantAttributeValue>(
        categoryId: string,
        inputs: AttributeValueDto[],
        variantValue: boolean,
        ownerId: string,
        categoryAttributeRepository: Repository<CategoryAttribute>,
        attributeRepository: Repository<Attribute>,
        optionRepository: Repository<AttributeOption>,
    ): Promise<T[]> {
        const attributeIds = inputs.map((item) => item['attributeId']);
        if (new Set(attributeIds).size !== attributeIds.length) {
            throw new BadRequestException('Each attribute can only be supplied once');
        }
        const result: T[] = [];

        for (const input of inputs as Array<AttributeValueDto & { attributeId: string }>) {
            if (!input.attributeId)
                throw new BadRequestException('Each attribute value requires an attributeId');
            const configuration = await categoryAttributeRepository.findOneBy({
                categoryId,
                attributeId: input.attributeId,
            });
            if (!configuration)
                throw new BadRequestException('Attribute is not assigned to the product category');
            if (configuration.isVariantAttribute !== variantValue) {
                throw new BadRequestException(
                    variantValue
                        ? 'Only variant attributes may be assigned to variants'
                        : 'Variant attributes must be assigned to a variant',
                );
            }
            const attribute = await attributeRepository.findOneBy({
                id: input.attributeId,
                isActive: true,
            });
            if (!attribute)
                throw new BadRequestException('Attribute is inactive or does not exist');

            const supplied = [
                input.optionId,
                input.valueText,
                input.valueNumber,
                input.valueBoolean,
                input.valueDate,
            ].filter((value) => value !== undefined && value !== null);
            if (supplied.length !== 1) {
                throw new BadRequestException('Exactly one attribute value must be provided');
            }

            const typeValue = {
                [AttributeDataType.TEXT]: input.valueText,
                [AttributeDataType.NUMBER]: input.valueNumber,
                [AttributeDataType.BOOLEAN]: input.valueBoolean,
                [AttributeDataType.DATE]: input.valueDate,
                [AttributeDataType.OPTION]: input.optionId,
            }[attribute.dataType];
            if (typeValue === undefined || typeValue === null) {
                throw new BadRequestException(
                    `Value does not match ${attribute.dataType} attribute type`,
                );
            }
            if (attribute.dataType === AttributeDataType.OPTION) {
                const option = await optionRepository.findOneBy({
                    id: input.optionId!,
                    attributeId: input.attributeId,
                    isActive: true,
                });
                if (!option)
                    throw new BadRequestException(
                        'Selected option is not active for this attribute',
                    );
            }

            result.push({
                ...(variantValue ? { variantId: ownerId } : { productId: ownerId }),
                attributeId: input.attributeId,
                optionId: input.optionId ?? null,
                valueText: input.valueText ?? null,
                valueNumber:
                    input.valueNumber === undefined || input.valueNumber === null
                        ? null
                        : String(input.valueNumber),
                valueBoolean: input.valueBoolean ?? null,
                valueDate: input.valueDate ?? null,
            } as T);
        }
        return result;
    }

    private async assertPublishable(product: Product, manager: import('typeorm').EntityManager) {
        await this.assertActiveCategory(product.categoryId, manager.getRepository(Category));
        const categories = manager.getRepository(CategoryAttribute);
        const mappings = await categories.find({
            where: { categoryId: product.categoryId },
        });
        const productMappings = mappings.filter(
            (mapping) => mapping.isRequired && !mapping.isVariantAttribute,
        );
        const productValues = await manager.getRepository(ProductAttributeValue).find({
            where: { productId: product.id },
        });
        const productAttributeIds = new Set(productValues.map((value) => value.attributeId));
        if (productMappings.some((mapping) => !productAttributeIds.has(mapping.attributeId))) {
            throw new BadRequestException(
                'All required product attributes must be provided before publishing',
            );
        }

        const variants = await manager.getRepository(ProductVariant).find({
            where: { productId: product.id, isActive: true },
        });
        if (!variants.length)
            throw new BadRequestException('An active product requires at least one active variant');
        if (!variants.some((variant) => variant.isDefault)) {
            throw new BadRequestException('An active product requires a default variant');
        }

        const requiredVariantIds = mappings
            .filter((mapping) => mapping.isRequired && mapping.isVariantAttribute)
            .map((mapping) => mapping.attributeId);
        for (const variant of variants) {
            const values = await manager.getRepository(VariantAttributeValue).find({
                where: { variantId: variant.id },
            });
            const valueIds = new Set(values.map((value) => value.attributeId));
            if (requiredVariantIds.some((attributeId) => !valueIds.has(attributeId))) {
                throw new BadRequestException('All required variant attributes must be provided');
            }
        }
    }

    private async assertActiveCategory(categoryId: string, repository: Repository<Category>) {
        const category = await repository.findOneBy({
            id: categoryId,
            isActive: true,
        });
        if (!category) throw new BadRequestException('Category is inactive or does not exist');
    }

    private async assertBrand(brandId: string | null | undefined, repository: Repository<Brand>) {
        if (brandId === undefined || brandId === null) return;
        const brand = await repository.findOneBy({
            id: brandId,
            isActive: true,
        });
        if (!brand) throw new BadRequestException('Brand is inactive or does not exist');
    }

    private async findProductById(id: string) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {
                category: true,
                brand: true,
                variants: {
                    attributeValues: { attribute: true, option: true },
                },
                images: true,
                attributeValues: { attribute: true, option: true },
            },
        });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    private async saveWithConflict<T>(save: () => Promise<T>, message: string): Promise<T> {
        try {
            return await save();
        } catch (error) {
            if (
                error instanceof QueryFailedError &&
                error.driverError &&
                typeof error.driverError === 'object' &&
                error.driverError !== null &&
                'code' in error.driverError &&
                (error.driverError as { code?: unknown }).code === '23505'
            ) {
                throw new ConflictException(message);
            }
            throw error;
        }
    }
}
