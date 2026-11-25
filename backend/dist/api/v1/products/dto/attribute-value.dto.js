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
exports.AttributeValueDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const entity_id_1 = require("../../common/utils/entity-id");
class AttributeValueDto {
    attributeId;
    optionId;
    valueText;
    valueNumber;
    valueBoolean;
    valueDate;
}
exports.AttributeValueDto = AttributeValueDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], AttributeValueDto.prototype, "attributeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", Object)
], AttributeValueDto.prototype, "optionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'مقدار متنی ویژگی' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10000),
    __metadata("design:type", Object)
], AttributeValueDto.prototype, "valueText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 6.7 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === '' || value === null ? value : Number(value)),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    __metadata("design:type", Object)
], AttributeValueDto.prototype, "valueNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'مقدار بولی ویژگی' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], AttributeValueDto.prototype, "valueBoolean", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-01-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], AttributeValueDto.prototype, "valueDate", void 0);
//# sourceMappingURL=attribute-value.dto.js.map