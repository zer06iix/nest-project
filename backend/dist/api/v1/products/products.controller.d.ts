import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { ReorderProductImagesDto } from './dto/reorder-product-images.dto';
import { CreateProductIdentifierDto } from './dto/create-product-identifier.dto';
import { QueryProductIdentifiersDto } from './dto/query-product-identifiers.dto';
import { SetAttributeValuesDto } from './dto/set-attribute-values.dto';
import { PriceComparisonQueryDto } from '../stores/dto/price-comparison-query.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto): Promise<import("./entities/product.entity").Product | null>;
    findAll(query: QueryProductsDto): Promise<{
        items: import("./entities/product.entity").Product[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllForAdmin(query: QueryProductsDto): Promise<{
        items: import("./entities/product.entity").Product[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAdminOne(id: string): Promise<import("./entities/product.entity").Product>;
    findBySlug(slug: string): Promise<import("./entities/product.entity").Product>;
    findVariantStores(id: string, variantId: string): Promise<import("../stores/entities/store-product.entity").StoreProduct[]>;
    findStores(id: string): Promise<import("../stores/entities/store-product.entity").StoreProduct[]>;
    findOffers(id: string): Promise<import("../stores/entities/store-product.entity").StoreProduct[]>;
    getPriceComparison(id: string, query: PriceComparisonQueryDto): Promise<{
        variants: {
            variantId: string;
            offers: {
                store: {
                    id: string;
                    name: string;
                    logo: string | null;
                };
                storeProductId: string;
                productVariant: import("./entities/product-variant.entity").ProductVariant;
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
    findVariant(id: string, variantId: string): Promise<import("./entities/product-variant.entity").ProductVariant>;
    findVariants(id: string): Promise<import("./entities/product-variant.entity").ProductVariant[]>;
    getAttributes(id: string): Promise<import("./entities/product-attribute-value.entity").ProductAttributeValue[]>;
    findIdentifiers(id: string, query: QueryProductIdentifiersDto): Promise<import("./entities/product-identifier.entity").ProductIdentifier[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(id: string, dto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<{
        id: string;
        status: import("./enums/product-status.enum").ProductStatus;
    }>;
    createVariant(id: string, dto: CreateProductVariantDto): Promise<import("./entities/product-variant.entity").ProductVariant | null>;
    updateVariant(id: string, variantId: string, dto: UpdateProductVariantDto): Promise<import("./entities/product-variant.entity").ProductVariant>;
    removeVariant(id: string, variantId: string): Promise<{
        id: string;
    }>;
    replaceAttributes(id: string, dto: SetAttributeValuesDto): Promise<import("./entities/product-attribute-value.entity").ProductAttributeValue[]>;
    replaceVariantAttributes(id: string, variantId: string, dto: SetAttributeValuesDto): Promise<import("./entities/variant-attribute-value.entity").VariantAttributeValue[]>;
    createImage(id: string, dto: CreateProductImageDto): Promise<import("./entities/product-image.entity").ProductImage>;
    removeImage(id: string, imageId: string): Promise<{
        id: string;
    }>;
    setPrimaryImage(id: string, imageId: string): Promise<import("./entities/product-image.entity").ProductImage>;
    reorderImages(id: string, dto: ReorderProductImagesDto): Promise<import("./entities/product-image.entity").ProductImage[]>;
    createIdentifier(id: string, dto: CreateProductIdentifierDto): Promise<import("./entities/product-identifier.entity").ProductIdentifier>;
    removeIdentifier(id: string, identifierId: string): Promise<{
        id: string;
    }>;
}
