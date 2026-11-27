import { Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../common/enums/role.enum';
import { ParseEntityIdPipe } from '../common/pipes/parse-entity-id.pipe';
import { StoresService } from './stores.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { QueryStoreProductsDto } from './dto/query-store-products.dto';
import { UpdateStoreProductPriceDto } from './dto/update-store-product-price.dto';
import { QueryPriceHistoryDto } from './dto/query-price-history.dto';

@ApiTags('محصولات فروشگاهی')
@Controller({ path: 'store-products', version: '1' })
export class StoreProductsController {
	constructor(private readonly storesService: StoresService) {}

	@Post()
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'ایجاد لیست محصول فروشگاه (فقط مدیر)' })
	create(@Body() dto: CreateStoreProductDto) {
		return this.storesService.createListingWithoutStoreParam(dto);
	}

	@Get()
	@ApiOperation({ summary: 'جست‌وجو و فیلتر لیست‌های محصولات فروشگاه' })
	findAll(@Query() query: QueryStoreProductsDto) {
		return this.storesService.findAllListings(query);
	}

	@Get(':id')
	@ApiOperation({ summary: 'دریافت جزئیات لیست محصول فروشگاه' })
	findOne(@Param('id', new ParseEntityIdPipe()) id: string) {
		return this.storesService.findListingById(id);
	}

	@Patch(':id')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'به‌روزرسانی لیست محصول فروشگاه (فقط مدیر)' })
	update(@Param('id', new ParseEntityIdPipe()) id: string, @Body() dto: UpdateStoreProductDto) {
		return this.storesService.updateListingById(id, dto);
	}

	@Delete(':id')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'غیرفعال‌سازی لیست محصول فروشگاه (فقط مدیر)' })
	remove(@Param('id', new ParseEntityIdPipe()) id: string) {
		return this.storesService.deactivateListingById(id);
	}

	@Post(':storeProductId/price')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'ثبت قیمت اولیه لیست محصول (فقط مدیر)' })
	createPrice(
		@Param('storeProductId', new ParseEntityIdPipe())
		storeProductId: string,
		@Body() dto: UpdateStoreProductPriceDto,
	) {
		return this.storesService.createPrice(storeProductId, dto);
	}

	@Patch(':storeProductId/price')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'به‌روزرسانی قیمت فعلی لیست محصول (فقط مدیر)' })
	updatePrice(
		@Param('storeProductId', new ParseEntityIdPipe())
		storeProductId: string,
		@Body() dto: UpdateStoreProductPriceDto,
	) {
		return this.storesService.updatePriceByListingId(storeProductId, dto);
	}

	@Get(':storeProductId/price')
	@ApiOperation({ summary: 'دریافت قیمت فعلی لیست محصول' })
	getPrice(
		@Param('storeProductId', new ParseEntityIdPipe())
		storeProductId: string,
	) {
		return this.storesService.getPrice(storeProductId);
	}

	@Get(':storeProductId/price-history')
	@ApiOperation({ summary: 'دریافت تاریخچه قیمت لیست محصول' })
	getPriceHistory(
		@Param('storeProductId', new ParseEntityIdPipe())
		storeProductId: string,
		@Query() query: QueryPriceHistoryDto,
	) {
		return this.storesService.priceHistoryByListingId(storeProductId, query);
	}
}
