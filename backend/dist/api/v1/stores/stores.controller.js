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
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
const role_decorator_1 = require("../common/decorators/role.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const parse_entity_id_pipe_1 = require("../common/pipes/parse-entity-id.pipe");
const stores_service_1 = require("./stores.service");
const create_store_dto_1 = require("./dto/create-store.dto");
const update_store_dto_1 = require("./dto/update-store.dto");
const query_stores_dto_1 = require("./dto/query-stores.dto");
const create_store_product_dto_1 = require("./dto/create-store-product.dto");
const update_store_product_dto_1 = require("./dto/update-store-product.dto");
const update_store_product_price_dto_1 = require("./dto/update-store-product-price.dto");
const query_price_history_dto_1 = require("./dto/query-price-history.dto");
const query_store_products_dto_1 = require("./dto/query-store-products.dto");
let StoresController = class StoresController {
    storesService;
    constructor(storesService) {
        this.storesService = storesService;
    }
    create(dto) {
        return this.storesService.create(dto);
    }
    findAll(query) {
        return this.storesService.findAll(query);
    }
    findAllForAdmin(query) {
        return this.storesService.findAll(query, true);
    }
    findBySlug(slug) {
        return this.storesService.findBySlug(slug);
    }
    priceHistory(id, storeProductId, query) {
        return this.storesService.priceHistory(id, storeProductId, query);
    }
    findListing(id, storeProductId) {
        return this.storesService.findListing(id, storeProductId);
    }
    findListings(id, query) {
        return this.storesService.findListings(id, query.page, query.limit);
    }
    findOne(id) {
        return this.storesService.findOne(id);
    }
    update(id, dto) {
        return this.storesService.update(id, dto);
    }
    deactivate(id) {
        return this.storesService.deactivate(id);
    }
    createListing(id, dto) {
        return this.storesService.createListing(id, dto);
    }
    updateListing(id, storeProductId, dto) {
        return this.storesService.updateListing(id, storeProductId, dto);
    }
    deactivateListing(id, storeProductId) {
        return this.storesService.deactivateListing(id, storeProductId);
    }
    updatePrice(id, storeProductId, dto) {
        return this.storesService.updatePrice(id, storeProductId, dto);
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'ایجاد فروشگاه (فقط مدیر)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'جست‌وجو در فروشگاه‌های فعال' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_stores_dto_1.QueryStoresDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'جست‌وجو در همه فروشگاه‌ها از جمله در انتظار و معلق (فقط مدیر)',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_stores_dto_1.QueryStoresDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findAllForAdmin", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت فروشگاه فعال بر اساس نامک' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id/products/:storeProductId/price-history'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت تاریخچه قیمت لیست فروشگاه به‌صورت صفحه‌بندی‌شده',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, query_price_history_dto_1.QueryPriceHistoryDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "priceHistory", null);
__decorate([
    (0, common_1.Get)(':id/products/:storeProductId'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت لیست فعال محصول فروشگاه' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findListing", null);
__decorate([
    (0, common_1.Get)(':id/products'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت لیست محصولات فعال فروشگاه' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_store_products_dto_1.QueryStoreProductsDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findListings", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت فروشگاه فعال بر اساس شناسه' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی اطلاعات و وضعیت فروشگاه (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_store_dto_1.UpdateStoreDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'تعلیق فروشگاه (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Post)(':id/products'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'ایجاد لیست فروشگاه و ثبت تاریخچه قیمت اولیه (فقط مدیر)',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_store_product_dto_1.CreateStoreProductDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "createListing", null);
__decorate([
    (0, common_1.Patch)(':id/products/:storeProductId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'به‌روزرسانی جزئیات لیست؛ قیمت باید از مسیر قیمت تغییر کند (فقط مدیر)',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_store_product_dto_1.UpdateStoreProductDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "updateListing", null);
__decorate([
    (0, common_1.Delete)(':id/products/:storeProductId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'غیرفعال‌سازی لیست فروشگاه (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "deactivateListing", null);
__decorate([
    (0, common_1.Patch)(':id/products/:storeProductId/price'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'به‌روزرسانی قیمت لیست و افزودن به تاریخچه قیمت (فقط مدیر)',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('storeProductId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_store_product_price_dto_1.UpdateStoreProductPriceDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "updatePrice", null);
exports.StoresController = StoresController = __decorate([
    (0, swagger_1.ApiTags)('فروشگاه‌ها'),
    (0, common_1.Controller)({ path: 'stores', version: '1' }),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map