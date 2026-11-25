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
exports.QueryCartsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const entity_id_1 = require("../../common/utils/entity-id");
const cart_status_enum_1 = require("../enums/cart-status.enum");
class QueryCartsDto {
    userId;
    status;
    page = 1;
    limit = 20;
    sortBy = 'createdAt';
    sortOrder = 'DESC';
}
exports.QueryCartsDto = QueryCartsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        pattern: entity_id_1.ENTITY_ID_PATTERN.source,
        description: 'فیلتر بر اساس شناسه کاربر',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], QueryCartsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: cart_status_enum_1.CartStatus, description: 'فیلتر بر اساس وضعیت سبد خرید' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(cart_status_enum_1.CartStatus),
    __metadata("design:type", String)
], QueryCartsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1, description: 'شماره صفحه' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryCartsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        maximum: 100,
        default: 20,
        description: 'تعداد آیتم در هر صفحه',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], QueryCartsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'فیلد مرتب‌سازی' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryCartsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['ASC', 'DESC'], default: 'DESC', description: 'ترتیب مرتب‌سازی' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryCartsDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-carts.dto.js.map