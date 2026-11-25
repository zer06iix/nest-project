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
exports.CreateAttributeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const attribute_datatype_enum_1 = require("../enums/attribute-datatype.enum");
class CreateAttributeDto {
    name;
    slug;
    dataType;
    unit;
    description;
    isActive;
}
exports.CreateAttributeDto = CreateAttributeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 120 }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim() : value),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateAttributeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 140, example: 'screen-size' }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(140),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    __metadata("design:type", String)
], CreateAttributeDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: attribute_datatype_enum_1.AttributeDataType }),
    (0, class_validator_1.IsEnum)(attribute_datatype_enum_1.AttributeDataType),
    __metadata("design:type", String)
], CreateAttributeDto.prototype, "dataType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 40 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", Object)
], CreateAttributeDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'توضیحات ویژگی' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateAttributeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'فعال یا غیرفعال بودن ویژگی' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAttributeDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-attribute.dto.js.map