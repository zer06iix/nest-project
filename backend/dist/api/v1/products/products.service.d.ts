import { DataSource, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CategoryAttribute } from '../attributes/entities/category-attribute.entity';
import { Attribute } from '../attributes/entities/attribute.entity';
import { AttributeOption } from '../attributes/entities/attribute-option.entity';
import { StoreProduct } from '../stores/entities/store-product.entity';
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
import { QueryProductsDto } from './dto/query-products.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { ReorderProductImagesDto } from './dto/reorder-product-images.dto';
import { CreateProductIdentifierDto } from './dto/create-product-identifier.dto';
import { QueryProductIdentifiersDto } from './dto/query-product-identifiers.dto';
import { AttributeValueDto } from './dto/attribute-value.dto';
export declare class ProductsService {
    private readonly productRepository;
    private readonly brandRepository;
    private readonly variantRepository;
    private readonly imageRepository;
    private readonly productValueRepository;
    private readonly variantValueRepository;
    private readonly identifierRepository;
    private readonly categoryRepository;
    private readonly categoryAttributeRepository;
    private readonly attributeRepository;
    private readonly optionRepository;
    private readonly storeProductRepository;
    private readonly dataSource;
    constructor(productRepository: Repository<Product>, brandRepository: Repository<Brand>, variantRepository: Repository<ProductVariant>, imageRepository: Repository<ProductImage>, productValueRepository: Repository<ProductAttributeValue>, variantValueRepository: Repository<VariantAttributeValue>, identifierRepository: Repository<ProductIdentifier>, categoryRepository: Repository<Category>, categoryAttributeRepository: Repository<CategoryAttribute>, attributeRepository: Repository<Attribute>, optionRepository: Repository<AttributeOption>, storeProductRepository: Repository<StoreProduct>, dataSource: DataSource);
    create(dto: CreateProductDto): Promise<Product | null>;
    findAll(query: QueryProductsDto, includeUnpublished?: boolean): Promise<{
        items: Product[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Product>;
    findAdminOne(id: string): Promise<Product>;
    findBySlug(slug: string): Promise<Product>;
    update(id: string, dto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<{
        id: string;
        status: ProductStatus;
    }>;
    createVariant(productId: string, dto: CreateProductVariantDto): Promise<ProductVariant | null>;
    findVariants(productId: string): Promise<ProductVariant[]>;
    findVariant(productId: string, variantId: string): Promise<ProductVariant>;
    updateVariant(productId: string, variantId: string, dto: UpdateProductVariantDto): Promise<ProductVariant>;
    removeVariant(productId: string, variantId: string): Promise<{
        id: string;
    }>;
    replaceProductAttributes(productId: string, values: AttributeValueDto[]): Promise<ProductAttributeValue[]>;
    getProductAttributes(productId: string): Promise<ProductAttributeValue[]>;
    replaceVariantAttributes(productId: string, variantId: string, values: AttributeValueDto[]): Promise<VariantAttributeValue[]>;
    createImage(productId: string, dto: CreateProductImageDto): Promise<ProductImage>;
    removeImage(productId: string, imageId: string): Promise<{
        id: string;
    }>;
    setPrimaryImage(productId: string, imageId: string): Promise<ProductImage>;
    reorderImages(productId: string, dto: ReorderProductImagesDto): Promise<ProductImage[]>;
    createIdentifier(productId: string, dto: CreateProductIdentifierDto): Promise<ProductIdentifier>;
    findIdentifiers(productId: string, query: QueryProductIdentifiersDto): Promise<ProductIdentifier[]>;
    removeIdentifier(productId: string, identifierId: string): Promise<{
        id: string;
    }>;
    findStoreListings(productId: string, variantId?: string): Promise<StoreProduct[]>;
    getPriceComparison(productId: string, sort?: string): Promise<{
        variants: {
            variantId: string;
            offers: {
                store: {
                    id: string;
                    name: string;
                    logo: string | null;
                };
                storeProductId: string;
                productVariant: ProductVariant;
                currentPrice: string;
                originalPrice: string | null;
                currency: string;
                discountPercentage: number | null;
                availability: import("../stores/enums/availability-status.enum").AvailabilityStatus;
                stockStatus: import("../stores/enums/stock-status.enum").StockStatus;
                lastPriceUpdate: Date;
            }[];
        }[];
    }>;
    private buildAttributeValues;
    private assertPublishable;
    private assertActiveCategory;
    private assertBrand;
    private findProductById;
    private saveWithConflict;
}
