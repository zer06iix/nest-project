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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
const category_attribute_entity_1 = require("../attributes/entities/category-attribute.entity");
const attribute_entity_1 = require("../attributes/entities/attribute.entity");
const attribute_option_entity_1 = require("../attributes/entities/attribute-option.entity");
const attribute_datatype_enum_1 = require("../attributes/enums/attribute-datatype.enum");
const store_product_entity_1 = require("../stores/entities/store-product.entity");
const store_entity_1 = require("../stores/entities/store.entity");
const price_entity_1 = require("../stores/entities/price.entity");
const store_status_enum_1 = require("../stores/enums/store-status.enum");
const product_entity_1 = require("./entities/product.entity");
const brand_entity_1 = require("./entities/brand.entity");
const product_variant_entity_1 = require("./entities/product-variant.entity");
const product_image_entity_1 = require("./entities/product-image.entity");
const product_attribute_value_entity_1 = require("./entities/product-attribute-value.entity");
const variant_attribute_value_entity_1 = require("./entities/variant-attribute-value.entity");
const product_identifier_entity_1 = require("./entities/product-identifier.entity");
const product_status_enum_1 = require("./enums/product-status.enum");
const query_products_dto_1 = require("./dto/query-products.dto");
let ProductsService = class ProductsService {
    productRepository;
    brandRepository;
    variantRepository;
    imageRepository;
    productValueRepository;
    variantValueRepository;
    identifierRepository;
    categoryRepository;
    categoryAttributeRepository;
    attributeRepository;
    optionRepository;
    storeProductRepository;
    dataSource;
    constructor(productRepository, brandRepository, variantRepository, imageRepository, productValueRepository, variantValueRepository, identifierRepository, categoryRepository, categoryAttributeRepository, attributeRepository, optionRepository, storeProductRepository, dataSource) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.variantRepository = variantRepository;
        this.imageRepository = imageRepository;
        this.productValueRepository = productValueRepository;
        this.variantValueRepository = variantValueRepository;
        this.identifierRepository = identifierRepository;
        this.categoryRepository = categoryRepository;
        this.categoryAttributeRepository = categoryAttributeRepository;
        this.attributeRepository = attributeRepository;
        this.optionRepository = optionRepository;
        this.storeProductRepository = storeProductRepository;
        this.dataSource = dataSource;
    }
    async create(dto) {
        return this.dataSource.transaction(async (manager) => {
            const products = manager.getRepository(product_entity_1.Product);
            await this.assertActiveCategory(dto.categoryId, manager.getRepository(category_entity_1.Category));
            await this.assertBrand(dto.brandId, manager.getRepository(brand_entity_1.Brand));
            if ((dto.status ?? product_status_enum_1.ProductStatus.DRAFT) !== product_status_enum_1.ProductStatus.DRAFT) {
                throw new common_1.BadRequestException('Create products as drafts, add variants, then publish');
            }
            const product = await this.saveWithConflict(() => products.save(products.create({
                name: dto.name,
                slug: dto.slug,
                description: dto.description ?? null,
                categoryId: dto.categoryId,
                brandId: dto.brandId ?? null,
                status: product_status_enum_1.ProductStatus.DRAFT,
            })), 'A product with this slug already exists');
            if (dto.attributes?.length) {
                const values = await this.buildAttributeValues(dto.categoryId, dto.attributes, false, product.id, manager.getRepository(category_attribute_entity_1.CategoryAttribute), manager.getRepository(attribute_entity_1.Attribute), manager.getRepository(attribute_option_entity_1.AttributeOption));
                await manager.getRepository(product_attribute_value_entity_1.ProductAttributeValue).save(values);
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
    async findAll(query, includeUnpublished = false) {
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
        }
        else {
            builder.where('product.status = :publicStatus', {
                publicStatus: product_status_enum_1.ProductStatus.ACTIVE,
            });
        }
        if (query.search) {
            builder.andWhere(`(
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
                )`, { search: `%${query.search.trim()}%` });
        }
        if (query.categoryId)
            builder.andWhere('product.categoryId = :categoryId', {
                categoryId: query.categoryId,
            });
        if (query.brandId)
            builder.andWhere('product.brandId = :brandId', {
                brandId: query.brandId,
            });
        if (query.minPrice !== undefined ||
            query.maxPrice !== undefined ||
            query.availabilityStatus ||
            query.stockStatus ||
            query.storeId) {
            builder
                .innerJoin('product.variants', 'priceVariant', 'priceVariant.isActive = true')
                .innerJoin('priceVariant.storeProducts', 'listing', 'listing.isActive = true AND listing.availabilityStatus = :availableStatus', {
                availableStatus: query.availabilityStatus ?? 'AVAILABLE',
            })
                .innerJoin('listing.store', 'listingStore', 'listingStore.status = :activeStoreStatus', {
                activeStoreStatus: store_status_enum_1.StoreStatus.ACTIVE,
            })
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
                throw new common_1.BadRequestException('Filterable attribute must be assigned to the selected category');
            }
            const config = await this.categoryAttributeRepository.findOneBy({
                categoryId: query.categoryId,
                attributeId: query.attributeId,
                isFilterable: true,
            });
            if (!config) {
                throw new common_1.BadRequestException('Filterable attribute must be assigned to the selected category');
            }
            builder
                .andWhere((qb) => {
                const subquery = qb
                    .subQuery()
                    .select('1')
                    .from(product_attribute_value_entity_1.ProductAttributeValue, 'filterValue')
                    .leftJoin('filterValue.option', 'filterOption')
                    .where('filterValue.productId = product.id')
                    .andWhere('filterValue.attributeId = :filterAttributeId')
                    .andWhere(`(
                        filterValue.valueText = :filterValue
                        OR filterValue.valueNumber::text = :filterValue
                        OR filterValue.valueBoolean::text = :filterValue
                        OR filterValue.valueDate::text = :filterValue
                        OR filterOption.value = :filterValue
                    )`)
                    .getQuery();
                return `EXISTS ${subquery}`;
            })
                .setParameters({
                filterAttributeId: query.attributeId,
                filterValue: query.attributeValue,
            });
        }
        if (query.sortBy === query_products_dto_1.ProductSort.PRICE) {
            builder
                .addSelect((subquery) => subquery
                .select('MIN(sortPrice.amount)')
                .from(store_product_entity_1.StoreProduct, 'sortListing')
                .innerJoin(product_variant_entity_1.ProductVariant, 'sortVariant', 'sortVariant.id = sortListing.productVariantId AND sortVariant.isActive = true')
                .innerJoin(price_entity_1.Price, 'sortPrice', 'sortPrice.storeProductId = sortListing.id')
                .innerJoin(store_entity_1.Store, 'sortStore', 'sortStore.id = sortListing.storeId AND sortStore.status = :sortStoreStatus')
                .where('sortVariant.productId = product.id')
                .andWhere('sortListing.isActive = true')
                .andWhere('sortListing.availabilityStatus = :sortAvailability'), 'minimum_price')
                .setParameter('sortStoreStatus', store_status_enum_1.StoreStatus.ACTIVE)
                .setParameter('sortAvailability', 'AVAILABLE')
                .orderBy('minimum_price', query.sortOrder, 'NULLS LAST')
                .addOrderBy('product.createdAt', 'DESC');
        }
        else {
            builder.orderBy(query.sortBy === query_products_dto_1.ProductSort.NAME ? 'product.name' : 'product.createdAt', query.sortOrder);
        }
        builder.skip((query.page - 1) * query.limit).take(query.limit);
        const [items, total] = await builder.getManyAndCount();
        return { items, total, page: query.page, limit: query.limit };
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id, status: product_status_enum_1.ProductStatus.ACTIVE },
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
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        product.variants = product.variants
            .filter((variant) => variant.isActive)
            .sort((left, right) => left.sortOrder - right.sortOrder);
        return product;
    }
    async findAdminOne(id) {
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
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async findBySlug(slug) {
        const product = await this.productRepository.findOne({
            where: { slug, status: product_status_enum_1.ProductStatus.ACTIVE },
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
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        product.variants = product.variants
            .filter((variant) => variant.isActive)
            .sort((left, right) => left.sortOrder - right.sortOrder);
        return product;
    }
    async update(id, dto) {
        return this.dataSource.transaction(async (manager) => {
            const products = manager.getRepository(product_entity_1.Product);
            const product = await products.findOneBy({ id });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            if (dto.categoryId)
                await this.assertActiveCategory(dto.categoryId, manager.getRepository(category_entity_1.Category));
            if (dto.categoryId && dto.categoryId !== product.categoryId) {
                const hasProductValues = await manager
                    .getRepository(product_attribute_value_entity_1.ProductAttributeValue)
                    .existsBy({ productId: product.id });
                const hasVariants = await manager
                    .getRepository(product_variant_entity_1.ProductVariant)
                    .existsBy({ productId: product.id });
                if (hasProductValues || hasVariants) {
                    throw new common_1.BadRequestException('Remove existing attribute values and variants before changing the product category');
                }
            }
            if (dto.brandId !== undefined)
                await this.assertBrand(dto.brandId, manager.getRepository(brand_entity_1.Brand));
            if (dto.slug && dto.slug !== product.slug) {
                if (await products.existsBy({ slug: dto.slug })) {
                    throw new common_1.ConflictException('A product with this slug already exists');
                }
            }
            if (dto.attributes !== undefined) {
                const values = await this.buildAttributeValues(dto.categoryId ?? product.categoryId, dto.attributes, false, product.id, manager.getRepository(category_attribute_entity_1.CategoryAttribute), manager.getRepository(attribute_entity_1.Attribute), manager.getRepository(attribute_option_entity_1.AttributeOption));
                await manager
                    .getRepository(product_attribute_value_entity_1.ProductAttributeValue)
                    .delete({ productId: product.id });
                if (values.length)
                    await manager.getRepository(product_attribute_value_entity_1.ProductAttributeValue).save(values);
            }
            Object.assign(product, {
                name: dto.name ?? product.name,
                slug: dto.slug ?? product.slug,
                description: dto.description === undefined ? product.description : dto.description,
                categoryId: dto.categoryId ?? product.categoryId,
                brandId: dto.brandId === undefined ? product.brandId : dto.brandId,
            });
            if (dto.status === product_status_enum_1.ProductStatus.ACTIVE) {
                await this.assertPublishable(product, manager);
            }
            if (dto.status)
                product.status = dto.status;
            await this.saveWithConflict(() => products.save(product), 'A product with this slug already exists');
            return this.findProductById(product.id);
        });
    }
    async remove(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        product.status = product_status_enum_1.ProductStatus.ARCHIVED;
        await this.productRepository.save(product);
        await this.productRepository.softDelete({ id });
        return { id, status: product_status_enum_1.ProductStatus.ARCHIVED };
    }
    async createVariant(productId, dto) {
        return this.dataSource.transaction(async (manager) => {
            const product = await manager.getRepository(product_entity_1.Product).findOneBy({ id: productId });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            const variants = manager.getRepository(product_variant_entity_1.ProductVariant);
            if (dto.isDefault) {
                await variants.update({ productId }, { isDefault: false });
            }
            const variant = await variants.save(variants.create({
                productId,
                title: dto.title,
                sku: dto.sku ?? null,
                isDefault: dto.isDefault ?? false,
                isActive: dto.isActive ?? true,
                sortOrder: dto.sortOrder ?? 0,
            }));
            if (dto.attributes?.length) {
                const values = await this.buildAttributeValues(product.categoryId, dto.attributes, true, variant.id, manager.getRepository(category_attribute_entity_1.CategoryAttribute), manager.getRepository(attribute_entity_1.Attribute), manager.getRepository(attribute_option_entity_1.AttributeOption));
                await manager.getRepository(variant_attribute_value_entity_1.VariantAttributeValue).save(values);
            }
            if (product.status === product_status_enum_1.ProductStatus.ACTIVE) {
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
    async findVariants(productId) {
        await this.findOne(productId);
        return this.variantRepository.find({
            where: { productId, isActive: true },
            relations: { attributeValues: { attribute: true, option: true } },
            order: { sortOrder: 'ASC', createdAt: 'ASC' },
        });
    }
    async findVariant(productId, variantId) {
        await this.findOne(productId);
        const variant = await this.variantRepository.findOne({
            where: { id: variantId, productId, isActive: true },
            relations: { attributeValues: { attribute: true, option: true } },
        });
        if (!variant)
            throw new common_1.NotFoundException('Product variant not found');
        return variant;
    }
    async updateVariant(productId, variantId, dto) {
        return this.dataSource.transaction(async (manager) => {
            const variants = manager.getRepository(product_variant_entity_1.ProductVariant);
            const variant = await variants.findOneBy({
                id: variantId,
                productId,
            });
            if (!variant)
                throw new common_1.NotFoundException('Product variant not found');
            const product = await manager.getRepository(product_entity_1.Product).findOneBy({ id: productId });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            if (dto.isDefault)
                await variants.update({ productId }, { isDefault: false });
            if (dto.attributes !== undefined) {
                const values = await this.buildAttributeValues(product.categoryId, dto.attributes, true, variant.id, manager.getRepository(category_attribute_entity_1.CategoryAttribute), manager.getRepository(attribute_entity_1.Attribute), manager.getRepository(attribute_option_entity_1.AttributeOption));
                await manager.getRepository(variant_attribute_value_entity_1.VariantAttributeValue).delete({ variantId });
                if (values.length)
                    await manager.getRepository(variant_attribute_value_entity_1.VariantAttributeValue).save(values);
            }
            Object.assign(variant, {
                title: dto.title ?? variant.title,
                sku: dto.sku === undefined ? variant.sku : dto.sku,
                isDefault: dto.isDefault ?? variant.isDefault,
                isActive: dto.isActive ?? variant.isActive,
                sortOrder: dto.sortOrder ?? variant.sortOrder,
            });
            const updated = await variants.save(variant);
            if (product.status === product_status_enum_1.ProductStatus.ACTIVE) {
                await this.assertPublishable(product, manager);
            }
            return updated;
        });
    }
    async removeVariant(productId, variantId) {
        return this.dataSource.transaction(async (manager) => {
            const variant = await manager
                .getRepository(product_variant_entity_1.ProductVariant)
                .findOneBy({ id: variantId, productId });
            if (!variant)
                throw new common_1.NotFoundException('Product variant not found');
            if (await manager
                .getRepository(store_product_entity_1.StoreProduct)
                .existsBy({ productVariantId: variantId, isActive: true })) {
                throw new common_1.ConflictException('Deactivate store listings before removing this variant');
            }
            const product = await manager.getRepository(product_entity_1.Product).findOneBy({ id: productId });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            await manager.getRepository(product_variant_entity_1.ProductVariant).remove(variant);
            if (product.status === product_status_enum_1.ProductStatus.ACTIVE) {
                await this.assertPublishable(product, manager);
            }
            return { id: variantId };
        });
    }
    async replaceProductAttributes(productId, values) {
        return this.dataSource.transaction(async (manager) => {
            const product = await manager.getRepository(product_entity_1.Product).findOneBy({ id: productId });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            const repository = manager.getRepository(product_attribute_value_entity_1.ProductAttributeValue);
            const prepared = await this.buildAttributeValues(product.categoryId, values, false, productId, manager.getRepository(category_attribute_entity_1.CategoryAttribute), manager.getRepository(attribute_entity_1.Attribute), manager.getRepository(attribute_option_entity_1.AttributeOption));
            await repository.delete({ productId });
            if (prepared.length)
                await repository.save(prepared);
            if (product.status === product_status_enum_1.ProductStatus.ACTIVE)
                await this.assertPublishable(product, manager);
            return repository.find({
                where: { productId },
                relations: { attribute: true, option: true },
            });
        });
    }
    async getProductAttributes(productId) {
        await this.findOne(productId);
        return this.productValueRepository.find({
            where: { productId },
            relations: { attribute: true, option: true },
            order: { createdAt: 'ASC' },
        });
    }
    async replaceVariantAttributes(productId, variantId, values) {
        return this.dataSource.transaction(async (manager) => {
            const product = await manager.getRepository(product_entity_1.Product).findOneBy({ id: productId });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            const variant = await manager
                .getRepository(product_variant_entity_1.ProductVariant)
                .findOneBy({ id: variantId, productId });
            if (!variant)
                throw new common_1.NotFoundException('Product variant not found');
            const repository = manager.getRepository(variant_attribute_value_entity_1.VariantAttributeValue);
            const prepared = await this.buildAttributeValues(product.categoryId, values, true, variantId, manager.getRepository(category_attribute_entity_1.CategoryAttribute), manager.getRepository(attribute_entity_1.Attribute), manager.getRepository(attribute_option_entity_1.AttributeOption));
            await repository.delete({ variantId });
            if (prepared.length)
                await repository.save(prepared);
            if (product.status === product_status_enum_1.ProductStatus.ACTIVE)
                await this.assertPublishable(product, manager);
            return repository.find({
                where: { variantId },
                relations: { attribute: true, option: true },
            });
        });
    }
    async createImage(productId, dto) {
        return this.dataSource.transaction(async (manager) => {
            const product = await manager.getRepository(product_entity_1.Product).findOneBy({ id: productId });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            const images = manager.getRepository(product_image_entity_1.ProductImage);
            const hasPrimary = await images.existsBy({
                productId,
                isPrimary: true,
            });
            const isPrimary = dto.isPrimary ?? !hasPrimary;
            if (isPrimary)
                await images.update({ productId }, { isPrimary: false });
            return images.save(images.create({
                productId,
                url: dto.url,
                altText: dto.altText ?? null,
                isPrimary,
                sortOrder: dto.sortOrder ?? 0,
            }));
        });
    }
    async removeImage(productId, imageId) {
        return this.dataSource.transaction(async (manager) => {
            const images = manager.getRepository(product_image_entity_1.ProductImage);
            const image = await images.findOneBy({ id: imageId, productId });
            if (!image)
                throw new common_1.NotFoundException('Product image not found');
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
    async setPrimaryImage(productId, imageId) {
        return this.dataSource.transaction(async (manager) => {
            const images = manager.getRepository(product_image_entity_1.ProductImage);
            const image = await images.findOneBy({ id: imageId, productId });
            if (!image)
                throw new common_1.NotFoundException('Product image not found');
            await images.update({ productId }, { isPrimary: false });
            image.isPrimary = true;
            return images.save(image);
        });
    }
    async reorderImages(productId, dto) {
        return this.dataSource.transaction(async (manager) => {
            const images = manager.getRepository(product_image_entity_1.ProductImage);
            const uniqueIds = new Set(dto.images.map((image) => image.imageId));
            if (uniqueIds.size !== dto.images.length)
                throw new common_1.BadRequestException('Duplicate image IDs');
            const rows = await images.findBy({
                productId,
                id: (0, typeorm_2.In)(dto.images.map((image) => image.imageId)),
            });
            if (rows.length !== dto.images.length) {
                throw new common_1.BadRequestException('Every image must belong to this product');
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
    async createIdentifier(productId, dto) {
        if (!(await this.productRepository.existsBy({ id: productId }))) {
            throw new common_1.NotFoundException('Product not found');
        }
        const repository = this.identifierRepository;
        return this.saveWithConflict(() => repository.save(repository.create({ productId, ...dto })), 'This product identifier is already registered');
    }
    async findIdentifiers(productId, query) {
        if (!(await this.productRepository.existsBy({
            id: productId,
            status: product_status_enum_1.ProductStatus.ACTIVE,
        }))) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.identifierRepository.find({
            where: { productId, ...(query.type ? { type: query.type } : {}) },
            order: { createdAt: 'ASC' },
        });
    }
    async removeIdentifier(productId, identifierId) {
        const result = await this.identifierRepository.delete({
            id: identifierId,
            productId,
        });
        if (!result.affected)
            throw new common_1.NotFoundException('Product identifier not found');
        return { id: identifierId };
    }
    async findStoreListings(productId, variantId) {
        const query = this.storeProductRepository
            .createQueryBuilder('listing')
            .innerJoinAndSelect('listing.store', 'store', 'store.status = :storeStatus', {
            storeStatus: store_status_enum_1.StoreStatus.ACTIVE,
        })
            .innerJoinAndSelect('listing.productVariant', 'variant')
            .innerJoinAndSelect('variant.product', 'product', 'product.id = :productId', {
            productId,
        })
            .leftJoinAndSelect('listing.price', 'price')
            .where('listing.isActive = true')
            .andWhere('product.status = :productStatus', {
            productStatus: product_status_enum_1.ProductStatus.ACTIVE,
        })
            .orderBy('price.amount', 'ASC', 'NULLS LAST');
        if (variantId)
            query.andWhere('variant.id = :variantId', { variantId });
        const listings = await query.getMany();
        if (!(await this.productRepository.existsBy({
            id: productId,
            status: product_status_enum_1.ProductStatus.ACTIVE,
        }))) {
            throw new common_1.NotFoundException('Product not found');
        }
        return listings;
    }
    async getPriceComparison(productId, sort = 'lowestPrice') {
        const listings = await this.findStoreListings(productId);
        const offers = listings.map((listing) => {
            const amount = listing.price ? Number(listing.price.amount) : null;
            const originalAmount = listing.price?.originalAmount
                ? Number(listing.price.originalAmount)
                : null;
            const discountPercentage = amount !== null && originalAmount !== null && originalAmount > 0
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
            if (a.currentPrice === null)
                return 1;
            if (b.currentPrice === null)
                return -1;
            return sort === 'highestPrice'
                ? Number(b.currentPrice) - Number(a.currentPrice)
                : Number(a.currentPrice) - Number(b.currentPrice);
        });
        const variants = new Map();
        for (const offer of offers) {
            const variantId = offer.productVariant.id;
            if (!variants.has(variantId))
                variants.set(variantId, []);
            variants.get(variantId)?.push(offer);
        }
        return {
            variants: Array.from(variants.entries()).map(([variantId, items]) => ({
                variantId,
                offers: items,
            })),
        };
    }
    async buildAttributeValues(categoryId, inputs, variantValue, ownerId, categoryAttributeRepository, attributeRepository, optionRepository) {
        const attributeIds = inputs.map((item) => item['attributeId']);
        if (new Set(attributeIds).size !== attributeIds.length) {
            throw new common_1.BadRequestException('Each attribute can only be supplied once');
        }
        const result = [];
        for (const input of inputs) {
            if (!input.attributeId)
                throw new common_1.BadRequestException('Each attribute value requires an attributeId');
            const configuration = await categoryAttributeRepository.findOneBy({
                categoryId,
                attributeId: input.attributeId,
            });
            if (!configuration)
                throw new common_1.BadRequestException('Attribute is not assigned to the product category');
            if (configuration.isVariantAttribute !== variantValue) {
                throw new common_1.BadRequestException(variantValue
                    ? 'Only variant attributes may be assigned to variants'
                    : 'Variant attributes must be assigned to a variant');
            }
            const attribute = await attributeRepository.findOneBy({
                id: input.attributeId,
                isActive: true,
            });
            if (!attribute)
                throw new common_1.BadRequestException('Attribute is inactive or does not exist');
            const supplied = [
                input.optionId,
                input.valueText,
                input.valueNumber,
                input.valueBoolean,
                input.valueDate,
            ].filter((value) => value !== undefined && value !== null);
            if (supplied.length !== 1) {
                throw new common_1.BadRequestException('Exactly one attribute value must be provided');
            }
            const typeValue = {
                [attribute_datatype_enum_1.AttributeDataType.TEXT]: input.valueText,
                [attribute_datatype_enum_1.AttributeDataType.NUMBER]: input.valueNumber,
                [attribute_datatype_enum_1.AttributeDataType.BOOLEAN]: input.valueBoolean,
                [attribute_datatype_enum_1.AttributeDataType.DATE]: input.valueDate,
                [attribute_datatype_enum_1.AttributeDataType.OPTION]: input.optionId,
            }[attribute.dataType];
            if (typeValue === undefined || typeValue === null) {
                throw new common_1.BadRequestException(`Value does not match ${attribute.dataType} attribute type`);
            }
            if (attribute.dataType === attribute_datatype_enum_1.AttributeDataType.OPTION) {
                const option = await optionRepository.findOneBy({
                    id: input.optionId,
                    attributeId: input.attributeId,
                    isActive: true,
                });
                if (!option)
                    throw new common_1.BadRequestException('Selected option is not active for this attribute');
            }
            result.push({
                ...(variantValue ? { variantId: ownerId } : { productId: ownerId }),
                attributeId: input.attributeId,
                optionId: input.optionId ?? null,
                valueText: input.valueText ?? null,
                valueNumber: input.valueNumber === undefined || input.valueNumber === null
                    ? null
                    : String(input.valueNumber),
                valueBoolean: input.valueBoolean ?? null,
                valueDate: input.valueDate ?? null,
            });
        }
        return result;
    }
    async assertPublishable(product, manager) {
        await this.assertActiveCategory(product.categoryId, manager.getRepository(category_entity_1.Category));
        const categories = manager.getRepository(category_attribute_entity_1.CategoryAttribute);
        const mappings = await categories.find({
            where: { categoryId: product.categoryId },
        });
        const productMappings = mappings.filter((mapping) => mapping.isRequired && !mapping.isVariantAttribute);
        const productValues = await manager.getRepository(product_attribute_value_entity_1.ProductAttributeValue).find({
            where: { productId: product.id },
        });
        const productAttributeIds = new Set(productValues.map((value) => value.attributeId));
        if (productMappings.some((mapping) => !productAttributeIds.has(mapping.attributeId))) {
            throw new common_1.BadRequestException('All required product attributes must be provided before publishing');
        }
        const variants = await manager.getRepository(product_variant_entity_1.ProductVariant).find({
            where: { productId: product.id, isActive: true },
        });
        if (!variants.length)
            throw new common_1.BadRequestException('An active product requires at least one active variant');
        if (!variants.some((variant) => variant.isDefault)) {
            throw new common_1.BadRequestException('An active product requires a default variant');
        }
        const requiredVariantIds = mappings
            .filter((mapping) => mapping.isRequired && mapping.isVariantAttribute)
            .map((mapping) => mapping.attributeId);
        for (const variant of variants) {
            const values = await manager.getRepository(variant_attribute_value_entity_1.VariantAttributeValue).find({
                where: { variantId: variant.id },
            });
            const valueIds = new Set(values.map((value) => value.attributeId));
            if (requiredVariantIds.some((attributeId) => !valueIds.has(attributeId))) {
                throw new common_1.BadRequestException('All required variant attributes must be provided');
            }
        }
    }
    async assertActiveCategory(categoryId, repository) {
        const category = await repository.findOneBy({
            id: categoryId,
            isActive: true,
        });
        if (!category)
            throw new common_1.BadRequestException('Category is inactive or does not exist');
    }
    async assertBrand(brandId, repository) {
        if (brandId === undefined || brandId === null)
            return;
        const brand = await repository.findOneBy({
            id: brandId,
            isActive: true,
        });
        if (!brand)
            throw new common_1.BadRequestException('Brand is inactive or does not exist');
    }
    async findProductById(id) {
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
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
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
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __param(2, (0, typeorm_1.InjectRepository)(product_variant_entity_1.ProductVariant)),
    __param(3, (0, typeorm_1.InjectRepository)(product_image_entity_1.ProductImage)),
    __param(4, (0, typeorm_1.InjectRepository)(product_attribute_value_entity_1.ProductAttributeValue)),
    __param(5, (0, typeorm_1.InjectRepository)(variant_attribute_value_entity_1.VariantAttributeValue)),
    __param(6, (0, typeorm_1.InjectRepository)(product_identifier_entity_1.ProductIdentifier)),
    __param(7, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(8, (0, typeorm_1.InjectRepository)(category_attribute_entity_1.CategoryAttribute)),
    __param(9, (0, typeorm_1.InjectRepository)(attribute_entity_1.Attribute)),
    __param(10, (0, typeorm_1.InjectRepository)(attribute_option_entity_1.AttributeOption)),
    __param(11, (0, typeorm_1.InjectRepository)(store_product_entity_1.StoreProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ProductsService);
//# sourceMappingURL=products.service.js.map