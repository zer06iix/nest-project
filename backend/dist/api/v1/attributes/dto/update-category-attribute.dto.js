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
exports.UpdateCategoryAttributeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const attribute_display_type_enum_1 = require("../enums/attribute-display-type.enum");
class UpdateCategoryAttributeDto {
    isRequired;
    isFilterable;
    isVisibleOnCard;
    isVisibleOnProduct;
    isVariantAttribute;
    displayType;
    sortOrder;
}
exports.UpdateCategoryAttributeDto = UpdateCategoryAttributeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'آیا مقدار این ویژگی الزامی است؟' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCategoryAttributeDto.prototype, "isRequired", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'آیا این ویژگی قابل فیلتر کردن است؟' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCategoryAttributeDto.prototype, "isFilterable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'آیا این ویژگی روی کارت نمایش داده می‌شود؟',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCategoryAttributeDto.prototype, "isVisibleOnCard", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'آیا این ویژگی در صفحه محصول نمایش داده می‌شود؟',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCategoryAttributeDto.prototype, "isVisibleOnProduct", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'آیا این ویژگی مخصوص نوع محصول است؟' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCategoryAttributeDto.prototype, "isVariantAttribute", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: attribute_display_type_enum_1.AttributeDisplayType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(attribute_display_type_enum_1.AttributeDisplayType),
    __metadata("design:type", String)
], UpdateCategoryAttributeDto.prototype, "displayType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCategoryAttributeDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=update-category-attribute.dto.js.map