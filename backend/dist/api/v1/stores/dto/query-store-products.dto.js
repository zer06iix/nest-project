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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryStoreProductsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const entity_id_1 = require("../../common/utils/entity-id");
const availability_status_enum_1 = require("../enums/availability-status.enum");
const stock_status_enum_1 = require("../enums/stock-status.enum");
const store_product_status_enum_1 = require("../enums/store-product-status.enum");
class QueryStoreProductsDto {
    page = 1;
    limit = 20;
    search;
    storeId;
    productId;
    productVariantId;
    availabilityStatus;
    stockStatus;
    status;
    minPrice;
    maxPrice;
}
exports.QueryStoreProductsDto = QueryStoreProductsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], QueryStoreProductsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 100, default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Object)
], QueryStoreProductsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'عبارت جست‌وجو در عنوان، توضیح یا نام محصول',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "productVariantId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(availability_status_enum_1.AvailabilityStatus),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "availabilityStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(stock_status_enum_1.StockStatus),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "stockStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(store_product_status_enum_1.StoreProductStatus),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value)),
    (0, class_validator_1.Matches)(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "minPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value)),
    (0, class_validator_1.Matches)(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/),
    __metadata("design:type", String)
], QueryStoreProductsDto.prototype, "maxPrice", void 0);
//# sourceMappingURL=query-store-products.dto.js.map