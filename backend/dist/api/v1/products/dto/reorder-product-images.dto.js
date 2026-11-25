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
exports.ReorderProductImagesDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const entity_id_1 = require("../../common/utils/entity-id");
class ProductImageOrderDto {
    imageId;
    sortOrder;
}
__decorate([
    (0, swagger_1.ApiProperty)({ pattern: entity_id_1.ENTITY_ID_PATTERN.source }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], ProductImageOrderDto.prototype, "imageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductImageOrderDto.prototype, "sortOrder", void 0);
class ReorderProductImagesDto {
    images;
}
exports.ReorderProductImagesDto = ReorderProductImagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProductImageOrderDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductImageOrderDto),
    __metadata("design:type", Array)
], ReorderProductImagesDto.prototype, "images", void 0);
//# sourceMappingURL=reorder-product-images.dto.js.map