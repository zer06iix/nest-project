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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
const role_decorator_1 = require("../common/decorators/role.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const parse_entity_id_pipe_1 = require("../common/pipes/parse-entity-id.pipe");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const query_products_dto_1 = require("./dto/query-products.dto");
const create_product_variant_dto_1 = require("./dto/create-product-variant.dto");
const update_product_variant_dto_1 = require("./dto/update-product-variant.dto");
const create_product_image_dto_1 = require("./dto/create-product-image.dto");
const reorder_product_images_dto_1 = require("./dto/reorder-product-images.dto");
const create_product_identifier_dto_1 = require("./dto/create-product-identifier.dto");
const query_product_identifiers_dto_1 = require("./dto/query-product-identifiers.dto");
const set_attribute_values_dto_1 = require("./dto/set-attribute-values.dto");
const price_comparison_query_dto_1 = require("../stores/dto/price-comparison-query.dto");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(dto) {
        return this.productsService.create(dto);
    }
    findAll(query) {
        return this.productsService.findAll(query);
    }
    findAllForAdmin(query) {
        return this.productsService.findAll(query, true);
    }
    findAdminOne(id) {
        return this.productsService.findAdminOne(id);
    }
    findBySlug(slug) {
        return this.productsService.findBySlug(slug);
    }
    findVariantStores(id, variantId) {
        return this.productsService.findStoreListings(id, variantId);
    }
    findStores(id) {
        return this.productsService.findStoreListings(id);
    }
    findOffers(id) {
        return this.productsService.findStoreListings(id);
    }
    getPriceComparison(id, query) {
        return this.productsService.getPriceComparison(id, query.sort);
    }
    findVariant(id, variantId) {
        return this.productsService.findVariant(id, variantId);
    }
    findVariants(id) {
        return this.productsService.findVariants(id);
    }
    getAttributes(id) {
        return this.productsService.getProductAttributes(id);
    }
    findIdentifiers(id, query) {
        return this.productsService.findIdentifiers(id, query);
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    update(id, dto) {
        return this.productsService.update(id, dto);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
    createVariant(id, dto) {
        return this.productsService.createVariant(id, dto);
    }
    updateVariant(id, variantId, dto) {
        return this.productsService.updateVariant(id, variantId, dto);
    }
    removeVariant(id, variantId) {
        return this.productsService.removeVariant(id, variantId);
    }
    replaceAttributes(id, dto) {
        return this.productsService.replaceProductAttributes(id, dto.values);
    }
    replaceVariantAttributes(id, variantId, dto) {
        return this.productsService.replaceVariantAttributes(id, variantId, dto.values);
    }
    createImage(id, dto) {
        return this.productsService.createImage(id, dto);
    }
    removeImage(id, imageId) {
        return this.productsService.removeImage(id, imageId);
    }
    setPrimaryImage(id, imageId) {
        return this.productsService.setPrimaryImage(id, imageId);
    }
    reorderImages(id, dto) {
        return this.productsService.reorderImages(id, dto);
    }
    createIdentifier(id, dto) {
        return this.productsService.createIdentifier(id, dto);
    }
    removeIdentifier(id, identifierId) {
        return this.productsService.removeIdentifier(id, identifierId);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'ایجاد پیش‌نویس محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'جست‌وجو و فیلتر محصولات فعال' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_products_dto_1.QueryProductsDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'جست‌وجو در همه محصولات شامل پیش‌نویس و آرشیو (فقط مدیر)',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_products_dto_1.QueryProductsDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAllForAdmin", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت هر محصول شامل پیش‌نویس و آرشیو (فقط مدیر)',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAdminOne", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت محصول فعال بر اساس نامک' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id/variants/:variantId/stores'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت لیست‌های فعال فروشگاه برای یک نوع محصول' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('variantId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findVariantStores", null);
__decorate([
    (0, common_1.Get)(':id/stores'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت لیست‌های فعال فروشگاه برای یک محصول' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findStores", null);
__decorate([
    (0, common_1.Get)(':id/offers'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت پیشنهادهای فعال محصول به‌ترتیب کمترین قیمت',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOffers", null);
__decorate([
    (0, common_1.Get)(':id/price-comparison'),
    (0, swagger_1.ApiOperation)({
        summary: 'مقایسه پیشنهادهای فعال انواع محصول در فروشگاه‌ها',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, price_comparison_query_dto_1.PriceComparisonQueryDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getPriceComparison", null);
__decorate([
    (0, common_1.Get)(':id/variants/:variantId'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت نوع محصول' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('variantId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findVariant", null);
__decorate([
    (0, common_1.Get)(':id/variants'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت انواع فعال محصول' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findVariants", null);
__decorate([
    (0, common_1.Get)(':id/attributes'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت مقادیر ویژگی‌های محصول' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getAttributes", null);
__decorate([
    (0, common_1.Get)(':id/identifiers'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت شناسه‌های محصول' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_product_identifiers_dto_1.QueryProductIdentifiersDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findIdentifiers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت محصول بر اساس شناسه' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی یا انتشار محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'آرشیو و حذف نرم محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/variants'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'افزودن نوع محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_variant_dto_1.CreateProductVariantDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createVariant", null);
__decorate([
    (0, common_1.Patch)(':id/variants/:variantId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی نوع محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('variantId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_product_variant_dto_1.UpdateProductVariantDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateVariant", null);
__decorate([
    (0, common_1.Delete)(':id/variants/:variantId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'حذف نوع محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('variantId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "removeVariant", null);
__decorate([
    (0, common_1.Put)(':id/attributes'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'جایگزینی مقادیر ویژگی‌های محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, set_attribute_values_dto_1.SetAttributeValuesDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "replaceAttributes", null);
__decorate([
    (0, common_1.Put)(':id/variants/:variantId/attributes'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'جایگزینی مقادیر ویژگی‌های نوع محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('variantId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, set_attribute_values_dto_1.SetAttributeValuesDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "replaceVariantAttributes", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'افزودن نشانی تصویر محصول (فقط مدیر؛ بارگذاری از فضای ذخیره خارجی انجام می‌شود)',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_image_dto_1.CreateProductImageDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createImage", null);
__decorate([
    (0, common_1.Delete)(':id/images/:imageId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'حذف تصویر محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('imageId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "removeImage", null);
__decorate([
    (0, common_1.Patch)(':id/images/:imageId/primary'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'تنظیم تصویر اصلی محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('imageId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "setPrimaryImage", null);
__decorate([
    (0, common_1.Patch)(':id/images/reorder'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'مرتب‌سازی تصاویر محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reorder_product_images_dto_1.ReorderProductImagesDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "reorderImages", null);
__decorate([
    (0, common_1.Post)(':id/identifiers'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'افزودن شناسه محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_identifier_dto_1.CreateProductIdentifierDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createIdentifier", null);
__decorate([
    (0, common_1.Delete)(':id/identifiers/:identifierId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'حذف شناسه محصول (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('identifierId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "removeIdentifier", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('محصولات'),
    (0, common_1.Controller)({ path: 'products', version: '1' }),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map