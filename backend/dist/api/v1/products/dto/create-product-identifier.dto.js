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
exports.CreateProductIdentifierDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const product_identifier_type_enum_1 = require("../enums/product-identifier-type.enum");
class CreateProductIdentifierDto {
    type;
    value;
}
exports.CreateProductIdentifierDto = CreateProductIdentifierDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: product_identifier_type_enum_1.ProductIdentifierType }),
    (0, class_validator_1.IsEnum)(product_identifier_type_enum_1.ProductIdentifierType),
    __metadata("design:type", String)
], CreateProductIdentifierDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 100 }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateProductIdentifierDto.prototype, "value", void 0);
//# sourceMappingURL=create-product-identifier.dto.js.map