import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../common/enums/role.enum';
import { ParseEntityIdPipe } from '../common/pipes/parse-entity-id.pipe';
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

@ApiTags('محصولات')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'ایجاد پیش‌نویس محصول (فقط مدیر)' })
    create(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'جست‌وجو و فیلتر محصولات فعال' })
    findAll(@Query() query: QueryProductsDto) {
        return this.productsService.findAll(query);
    }

    @Get('admin')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'جست‌وجو در همه محصولات شامل پیش‌نویس و آرشیو (فقط مدیر)' })
    findAllForAdmin(@Query() query: QueryProductsDto) {
        return this.productsService.findAll(query, true);
    }

    @Get('admin/:id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'دریافت هر محصول شامل پیش‌نویس و آرشیو (فقط مدیر)' })
    findAdminOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findAdminOne(id);
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'دریافت محصول فعال بر اساس نامک' })
    findBySlug(@Param('slug') slug: string) {
        return this.productsService.findBySlug(slug);
    }

    @Get(':id/variants/:variantId/stores')
    @ApiOperation({ summary: 'دریافت لیست‌های فعال فروشگاه برای یک نوع محصول' })
    findVariantStores(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('variantId', new ParseEntityIdPipe()) variantId: string,
    ) {
        return this.productsService.findStoreListings(id, variantId);
    }

    @Get(':id/stores')
    @ApiOperation({ summary: 'دریافت لیست‌های فعال فروشگاه برای یک محصول' })
    findStores(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findStoreListings(id);
    }

    @Get(':id/offers')
    @ApiOperation({ summary: 'دریافت پیشنهادهای فعال محصول به‌ترتیب کمترین قیمت' })
    findOffers(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findStoreListings(id);
    }

    @Get(':id/price-comparison')
    @ApiOperation({ summary: 'مقایسه پیشنهادهای فعال انواع محصول در فروشگاه‌ها' })
    getPriceComparison(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Query() query: PriceComparisonQueryDto,
    ) {
        return this.productsService.getPriceComparison(id, query.sort);
    }

    @Get(':id/variants/:variantId')
    @ApiOperation({ summary: 'دریافت نوع محصول' })
    findVariant(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('variantId', new ParseEntityIdPipe()) variantId: string,
    ) {
        return this.productsService.findVariant(id, variantId);
    }

    @Get(':id/variants')
    @ApiOperation({ summary: 'دریافت انواع فعال محصول' })
    findVariants(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findVariants(id);
    }

    @Get(':id/attributes')
    @ApiOperation({ summary: 'دریافت مقادیر ویژگی‌های محصول' })
    getAttributes(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.getProductAttributes(id);
    }

    @Get(':id/identifiers')
    @ApiOperation({ summary: 'دریافت شناسه‌های محصول' })
    findIdentifiers(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Query() query: QueryProductIdentifiersDto,
    ) {
        return this.productsService.findIdentifiers(id, query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'دریافت محصول بر اساس شناسه' })
    findOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'به‌روزرسانی یا انتشار محصول (فقط مدیر)' })
    update(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: UpdateProductDto,
    ) {
        return this.productsService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'آرشیو و حذف نرم محصول (فقط مدیر)' })
    remove(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.remove(id);
    }

    @Post(':id/variants')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'افزودن نوع محصول (فقط مدیر)' })
    createVariant(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: CreateProductVariantDto,
    ) {
        return this.productsService.createVariant(id, dto);
    }

    @Patch(':id/variants/:variantId')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'به‌روزرسانی نوع محصول (فقط مدیر)' })
    updateVariant(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('variantId', new ParseEntityIdPipe()) variantId: string,
        @Body() dto: UpdateProductVariantDto,
    ) {
        return this.productsService.updateVariant(id, variantId, dto);
    }

    @Delete(':id/variants/:variantId')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'حذف نوع محصول (فقط مدیر)' })
    removeVariant(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('variantId', new ParseEntityIdPipe()) variantId: string,
    ) {
        return this.productsService.removeVariant(id, variantId);
    }

    @Put(':id/attributes')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'جایگزینی مقادیر ویژگی‌های محصول (فقط مدیر)' })
    replaceAttributes(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: SetAttributeValuesDto,
    ) {
        return this.productsService.replaceProductAttributes(id, dto.values);
    }

    @Put(':id/variants/:variantId/attributes')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'جایگزینی مقادیر ویژگی‌های نوع محصول (فقط مدیر)' })
    replaceVariantAttributes(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('variantId', new ParseEntityIdPipe()) variantId: string,
        @Body() dto: SetAttributeValuesDto,
    ) {
        return this.productsService.replaceVariantAttributes(id, variantId, dto.values);
    }

    @Post(':id/images')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'افزودن نشانی تصویر محصول (فقط مدیر؛ بارگذاری از فضای ذخیره خارجی انجام می‌شود)' })
    createImage(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: CreateProductImageDto,
    ) {
        return this.productsService.createImage(id, dto);
    }

    @Delete(':id/images/:imageId')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'حذف تصویر محصول (فقط مدیر)' })
    removeImage(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('imageId', new ParseEntityIdPipe()) imageId: string,
    ) {
        return this.productsService.removeImage(id, imageId);
    }

    @Patch(':id/images/:imageId/primary')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'تنظیم تصویر اصلی محصول (فقط مدیر)' })
    setPrimaryImage(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('imageId', new ParseEntityIdPipe()) imageId: string,
    ) {
        return this.productsService.setPrimaryImage(id, imageId);
    }

    @Patch(':id/images/reorder')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'مرتب‌سازی تصاویر محصول (فقط مدیر)' })
    reorderImages(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: ReorderProductImagesDto,
    ) {
        return this.productsService.reorderImages(id, dto);
    }

    @Post(':id/identifiers')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'افزودن شناسه محصول (فقط مدیر)' })
    createIdentifier(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: CreateProductIdentifierDto,
    ) {
        return this.productsService.createIdentifier(id, dto);
    }

    @Delete(':id/identifiers/:identifierId')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'حذف شناسه محصول (فقط مدیر)' })
    removeIdentifier(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('identifierId', new ParseEntityIdPipe()) identifierId: string,
    ) {
        return this.productsService.removeIdentifier(id, identifierId);
    }
}
