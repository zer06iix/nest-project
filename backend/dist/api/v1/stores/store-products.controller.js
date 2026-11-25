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
exports.StoreProductsController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
const role_decorator_1 = require("../common/decorators/role.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const parse_entity_id_pipe_1 = require("../common/pipes/parse-entity-id.pipe");
const stores_service_1 = require("./stores.service");
const create_store_product_dto_1 = require("./dto/create-store-product.dto");
const update_store_product_dto_1 = require("./dto/update-store-product.dto");
const query_store_products_dto_1 = require("./dto/query-store-products.dto");
const update_store_product_price_dto_1 = require("./dto/update-store-product-price.dto");
const query_price_history_dto_1 = require("./dto/query-price-history.dto");
let StoreProductsController = class StoreProductsController {
    storesService;
    constructor(storesService) {
        this.storesService = storesService;
    }
    create(dto) {
        return this.storesService.createListingWithoutStoreParam(dto);
    }
    findAll(query) {
        return this.storesService.findAllListings(query);
    }
    findOne(id) {
        return this.storesService.findListingById(id);
    }
    update(id, dto) {
        return this.storesService.updateListingById(id, dto);
    }
    remove(id) {
        return this.storesService.deactivateListingById(id);
    }
    createPrice(storeProductId, dto) {
        return this.storesService.createPrice(storeProductId, dto);
    }
    updatePrice(storeProductId, dto) {
        return this.storesService.updatePriceByListingId(storeProductId, dto);
    }
    getPrice(storeProductId) {
        return this.storesService.getPrice(storeProductId);
    }
    getPriceHistory(storeProductId, query) {
        return this.storesService.priceHistoryByListingId(storeProductId, query);
    }
};
exports.StoreProductsController = StoreProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'ایجاد لیست محصول فروشگاه (فقط مدیر)' }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_product_dto_1.CreateStoreProductDto]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'جست‌وجو و فیلتر لیست‌های محصولات فروشگاه' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_store_products_dto_1.QueryStoreProductsDto]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت جزئیات لیست محصول فروشگاه' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی لیست محصول فروشگاه (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_store_product_dto_1.UpdateStoreProductDto]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'غیرفعال‌سازی لیست محصول فروشگاه (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':storeProductId/price'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'ثبت قیمت اولیه لیست محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_store_product_price_dto_1.UpdateStoreProductPriceDto]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "createPrice", null);
__decorate([
    (0, common_1.Patch)(':storeProductId/price'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی قیمت فعلی لیست محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_store_product_price_dto_1.UpdateStoreProductPriceDto]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "updatePrice", null);
__decorate([
    (0, common_1.Get)(':storeProductId/price'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت قیمت فعلی لیست محصول' }),
    __param(0, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "getPrice", null);
__decorate([
    (0, common_1.Get)(':storeProductId/price-history'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت تاریخچه قیمت لیست محصول' }),
    __param(0, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_price_history_dto_1.QueryPriceHistoryDto]),
    __metadata("design:returntype", void 0)
], StoreProductsController.prototype, "getPriceHistory", null);
exports.StoreProductsController = StoreProductsController = __decorate([
    (0, swagger_1.ApiTags)('محصولات فروشگاهی'),
    (0, common_1.Controller)({ path: 'store-products', version: '1' }),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoreProductsController);
//# sourceMappingURL=store-products.controller.js.map