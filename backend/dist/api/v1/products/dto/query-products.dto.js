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
exports.QueryProductsDto = exports.ProductSort = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const entity_id_1 = require("../../common/utils/entity-id");
const product_status_enum_1 = require("../enums/product-status.enum");
const availability_status_enum_1 = require("../../stores/enums/availability-status.enum");
const stock_status_enum_1 = require("../../stores/enums/stock-status.enum");
var ProductSort;
(function (ProductSort) {
    ProductSort["CREATED_AT"] = "createdAt";
    ProductSort["NAME"] = "name";
    ProductSort["PRICE"] = "price";
})(ProductSort || (exports.ProductSort = ProductSort = {}));
class QueryProductsDto {
    page = 1;
    limit = 20;
    search;
    categoryId;
    brandId;
    storeId;
    status;
    availabilityStatus;
    stockStatus;
    minPrice;
    maxPrice;
    attributeId;
    attributeValue;
    sortBy = ProductSort.CREATED_AT;
    sortOrder = 'DESC';
}
exports.QueryProductsDto = QueryProductsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], QueryProductsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 100, default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Object)
], QueryProductsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'عبارت جست‌وجو در نام محصول' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "brandId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: product_status_enum_1.ProductStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(product_status_enum_1.ProductStatus),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: availability_status_enum_1.AvailabilityStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(availability_status_enum_1.AvailabilityStatus),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "availabilityStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: stock_status_enum_1.StockStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(stock_status_enum_1.StockStatus),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "stockStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(Number.MAX_SAFE_INTEGER),
    __metadata("design:type", Number)
], QueryProductsDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(Number.MAX_SAFE_INTEGER),
    __metadata("design:type", Number)
], QueryProductsDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "attributeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'مقدار ویژگی برای فیلتر محصولات' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "attributeValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ProductSort, default: ProductSort.CREATED_AT }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ProductSort),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['ASC', 'DESC'], default: 'DESC' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['ASC', 'DESC']),
    __metadata("design:type", String)
], QueryProductsDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-products.dto.js.map