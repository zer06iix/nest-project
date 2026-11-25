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
exports.CreateCartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const entity_id_1 = require("../../common/utils/entity-id");
class CreateCartDto {
    userId;
    sessionId;
}
exports.CreateCartDto = CreateCartDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        pattern: entity_id_1.ENTITY_ID_PATTERN.source,
        description: 'شناسه کاربر (اختیاری، پیش‌فرض: کاربر احراز هویت شده)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(entity_id_1.ENTITY_ID_PATTERN),
    __metadata("design:type", String)
], CreateCartDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'شناسه نشست برای کاربران مهمان (اختیاری)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCartDto.prototype, "sessionId", void 0);
//# sourceMappingURL=create-cart.dto.js.map