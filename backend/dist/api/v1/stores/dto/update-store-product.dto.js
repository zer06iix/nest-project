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
exports.UpdateStoreProductDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const availability_status_enum_1 = require("../enums/availability-status.enum");
const stock_status_enum_1 = require("../enums/stock-status.enum");
const store_product_status_enum_1 = require("../enums/store-product-status.enum");
class UpdateStoreProductDto {
    externalUrl;
    externalProductId;
    title;
    description;
    availabilityStatus;
    stockStatus;
    isActive;
    stockQuantity;
    status;
}
exports.UpdateStoreProductDto = UpdateStoreProductDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 2048 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ require_protocol: true }),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", String)
], UpdateStoreProductDto.prototype, "externalUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 255 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", Object)
], UpdateStoreProductDto.prototype, "externalProductId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 255 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", Object)
], UpdateStoreProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'توضیحات اختصاصی فروشگاه برای محصول' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateStoreProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: availability_status_enum_1.AvailabilityStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(availability_status_enum_1.AvailabilityStatus),
    __metadata("design:type", String)
], UpdateStoreProductDto.prototype, "availabilityStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: stock_status_enum_1.StockStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(stock_status_enum_1.StockStatus),
    __metadata("design:type", String)
], UpdateStoreProductDto.prototype, "stockStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'فعال یا غیرفعال بودن لیست فروشگاه' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateStoreProductDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === null ? value : Number(value))),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateStoreProductDto.prototype, "stockQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: store_product_status_enum_1.StoreProductStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(store_product_status_enum_1.StoreProductStatus),
    __metadata("design:type", String)
], UpdateStoreProductDto.prototype, "status", void 0);
//# sourceMappingURL=update-store-product.dto.js.map