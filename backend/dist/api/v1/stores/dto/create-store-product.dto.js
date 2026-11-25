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
exports.CreateStoreProductDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const entity_id_1 = require("../../common/utils/entity-id");
const availability_status_enum_1 = require("../enums/availability-status.enum");
const stock_status_enum_1 = require("../enums/stock-status.enum");
const store_product_status_enum_1 = require("../enums/store-product-status.enum");
class CreateStoreProductDto {
    storeId;
    productVariantId;
    externalUrl;
    currentPrice;
    originalPrice;
    currency;
    externalProductId;
    title;
    description;
    availabilityStatus;
    stockStatus;
    isActive;
    stockQuantity;
    status;
}
exports.CreateStoreProductDto = CreateStoreProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], CreateStoreProductDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], CreateStoreProductDto.prototype, "productVariantId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 2048 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ protocols: ['http', 'https'], require_protocol: true }),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", Object)
], CreateStoreProductDto.prototype, "externalUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0 }),
    (0, class_transformer_1.Transform)(({ value }) => String(value)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, {
        message: 'currentPrice must be a positive decimal',
    }),
    __metadata("design:type", String)
], CreateStoreProductDto.prototype, "currentPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null)
            return value;
        if (typeof value === 'string')
            return value;
        if (typeof value === 'number')
            return value.toString();
        return JSON.stringify(value);
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, {
        message: 'originalPrice must be a decimal',
    }),
    __metadata("design:type", Object)
], CreateStoreProductDto.prototype, "originalPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'IRR', minLength: 3, maxLength: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Z]{3}$/),
    __metadata("design:type", String)
], CreateStoreProductDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 255 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", Object)
], CreateStoreProductDto.prototype, "externalProductId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 255 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", Object)
], CreateStoreProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'توضیحات اختصاصی فروشگاه برای محصول' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateStoreProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: availability_status_enum_1.AvailabilityStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(availability_status_enum_1.AvailabilityStatus),
    __metadata("design:type", String)
], CreateStoreProductDto.prototype, "availabilityStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: stock_status_enum_1.StockStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(stock_status_enum_1.StockStatus),
    __metadata("design:type", String)
], CreateStoreProductDto.prototype, "stockStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'فعال یا غیرفعال بودن لیست فروشگاه' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStoreProductDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateStoreProductDto.prototype, "stockQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: store_product_status_enum_1.StoreProductStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(store_product_status_enum_1.StoreProductStatus),
    __metadata("design:type", String)
], CreateStoreProductDto.prototype, "status", void 0);
//# sourceMappingURL=create-store-product.dto.js.map