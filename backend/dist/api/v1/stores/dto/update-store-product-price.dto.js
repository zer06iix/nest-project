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
exports.UpdateStoreProductPriceDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateStoreProductPriceDto {
    amount;
    originalAmount;
    currency;
}
exports.UpdateStoreProductPriceDto = UpdateStoreProductPriceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0 }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'number')
            return value.toString();
        if (typeof value === 'string')
            return value;
        return JSON.stringify(value);
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, {
        message: 'amount must be a positive decimal',
    }),
    __metadata("design:type", String)
], UpdateStoreProductPriceDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'number')
            return value.toString();
        if (typeof value === 'string')
            return value;
        return JSON.stringify(value);
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, {
        message: 'originalAmount must be a decimal',
    }),
    __metadata("design:type", Object)
], UpdateStoreProductPriceDto.prototype, "originalAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minLength: 3, maxLength: 3, example: 'IRR' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Z]{3}$/),
    __metadata("design:type", String)
], UpdateStoreProductPriceDto.prototype, "currency", void 0);
//# sourceMappingURL=update-store-product-price.dto.js.map