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

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Create a product draft (admin only)' })
    create(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Search and filter active products' })
    findAll(@Query() query: QueryProductsDto) {
        return this.productsService.findAll(query);
    }

    @Get('admin')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Search products including drafts and archived records (admin only)' })
    findAllForAdmin(@Query() query: QueryProductsDto) {
        return this.productsService.findAll(query, true);
    }

    @Get('admin/:id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Get any product, including drafts and archived records (admin only)' })
    findAdminOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findAdminOne(id);
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get an active product by slug' })
    findBySlug(@Param('slug') slug: string) {
        return this.productsService.findBySlug(slug);
    }

    @Get(':id/variants/:variantId/stores')
    @ApiOperation({ summary: 'List active store listings for a product variant' })
    findVariantStores(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('variantId', new ParseEntityIdPipe()) variantId: string,
    ) {
        return this.productsService.findStoreListings(id, variantId);
    }

    @Get(':id/stores')
    @ApiOperation({ summary: 'List active store listings for a product' })
    findStores(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findStoreListings(id);
    }

    @Get(':id/variants/:variantId')
    @ApiOperation({ summary: 'Get a product variant' })
    findVariant(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('variantId', new ParseEntityIdPipe()) variantId: string,
    ) {
        return this.productsService.findVariant(id, variantId);
    }

    @Get(':id/variants')
    @ApiOperation({ summary: 'List active variants for a product' })
    findVariants(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findVariants(id);
    }

    @Get(':id/attributes')
    @ApiOperation({ summary: 'List product attribute values' })
    getAttributes(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.getProductAttributes(id);
    }

    @Get(':id/identifiers')
    @ApiOperation({ summary: 'List product identifiers' })
    findIdentifiers(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Query() query: QueryProductIdentifiersDto,
    ) {
        return this.productsService.findIdentifiers(id, query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    findOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Update or publish a product (admin only)' })
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
    @ApiOperation({ summary: 'Archive and soft-delete a product (admin only)' })
    remove(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.productsService.remove(id);
    }

    @Post(':id/variants')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Add a product variant (admin only)' })
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
    @ApiOperation({ summary: 'Update a product variant (admin only)' })
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
    @ApiOperation({ summary: 'Remove a product variant (admin only)' })
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
    @ApiOperation({ summary: 'Replace product attribute values (admin only)' })
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
    @ApiOperation({ summary: 'Replace variant attribute values (admin only)' })
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
    @ApiOperation({ summary: 'Add a product image URL (admin only; upload is handled by external storage)' })
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
    @ApiOperation({ summary: 'Delete a product image (admin only)' })
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
    @ApiOperation({ summary: 'Set a product image as primary (admin only)' })
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
    @ApiOperation({ summary: 'Reorder product images (admin only)' })
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
    @ApiOperation({ summary: 'Add a product identifier (admin only)' })
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
    @ApiOperation({ summary: 'Delete a product identifier (admin only)' })
    removeIdentifier(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('identifierId', new ParseEntityIdPipe()) identifierId: string,
    ) {
        return this.productsService.removeIdentifier(id, identifierId);
    }
}
