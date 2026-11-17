import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../common/enums/role.enum';
import { ParseEntityIdPipe } from '../common/pipes/parse-entity-id.pipe';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { QueryStoresDto } from './dto/query-stores.dto';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { UpdateStoreProductPriceDto } from './dto/update-store-product-price.dto';
import { QueryPriceHistoryDto } from './dto/query-price-history.dto';
import { QueryStoreProductsDto } from './dto/query-store-products.dto';

@ApiTags('Stores')
@Controller({ path: 'stores', version: '1' })
export class StoresController {
    constructor(private readonly storesService: StoresService) {}

    @Post()
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Create a store (admin only)' })
    create(@Body() dto: CreateStoreDto) {
        return this.storesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Search active stores' })
    findAll(@Query() query: QueryStoresDto) {
        return this.storesService.findAll(query);
    }

    @Get('admin')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Search stores including pending and suspended records (admin only)' })
    findAllForAdmin(@Query() query: QueryStoresDto) {
        return this.storesService.findAll(query, true);
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get an active store by slug' })
    findBySlug(@Param('slug') slug: string) {
        return this.storesService.findBySlug(slug);
    }

    @Get(':id/products/:storeProductId/price-history')
    @ApiOperation({ summary: 'Get paginated price history for a store listing' })
    priceHistory(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('storeProductId', new ParseEntityIdPipe()) storeProductId: string,
        @Query() query: QueryPriceHistoryDto,
    ) {
        return this.storesService.priceHistory(id, storeProductId, query);
    }

    @Get(':id/products/:storeProductId')
    @ApiOperation({ summary: 'Get an active store listing' })
    findListing(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('storeProductId', new ParseEntityIdPipe()) storeProductId: string,
    ) {
        return this.storesService.findListing(id, storeProductId);
    }

    @Get(':id/products')
    @ApiOperation({ summary: 'List active product listings for a store' })
    findListings(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Query() query: QueryStoreProductsDto,
    ) {
        return this.storesService.findListings(id, query.page, query.limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an active store by ID' })
    findOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.storesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Update store details and status (admin only)' })
    update(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: UpdateStoreDto,
    ) {
        return this.storesService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Suspend a store (admin only)' })
    deactivate(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.storesService.deactivate(id);
    }

    @Post(':id/products')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Create a store listing and initial price history (admin only)' })
    createListing(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: CreateStoreProductDto,
    ) {
        return this.storesService.createListing(id, dto);
    }

    @Patch(':id/products/:storeProductId')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Update listing details (price must use the price endpoint)' })
    updateListing(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('storeProductId', new ParseEntityIdPipe()) storeProductId: string,
        @Body() dto: UpdateStoreProductDto,
    ) {
        return this.storesService.updateListing(id, storeProductId, dto);
    }

    @Delete(':id/products/:storeProductId')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Deactivate a store listing (admin only)' })
    deactivateListing(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('storeProductId', new ParseEntityIdPipe()) storeProductId: string,
    ) {
        return this.storesService.deactivateListing(id, storeProductId);
    }

    @Patch(':id/products/:storeProductId/price')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Update a listing price and append price history (admin only)' })
    updatePrice(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Param('storeProductId', new ParseEntityIdPipe()) storeProductId: string,
        @Body() dto: UpdateStoreProductPriceDto,
    ) {
        return this.storesService.updatePrice(id, storeProductId, dto);
    }
}
