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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const role_enum_1 = require("../../common/enums/role.enum");
const swagger_1 = require("@nestjs/swagger");
const phone_validator_1 = require("../../common/validators/phone.validator");
class CreateUserDto {
    phoneNumber;
    displayName;
    password;
    role;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'شماره تماس',
        example: '09124678266',
    }),
    (0, class_validator_1.IsString)({ message: 'شماره موبایل باید یک رشته باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'شماره موبایل نمیتواند خالی باشد' }),
    (0, phone_validator_1.IsIranPhoneNumber)({
        message: 'شماره موبایل معتبر نیست (فرمت: 09xxxxxxxxx یا +989xxxxxxxxx)',
    }),
    (0, phone_validator_1.NormalizeIranPhone)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string')
            return value.trim();
        return value;
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'نام نمایشی',
        example: 'علی',
    }),
    (0, class_validator_1.IsString)({ message: 'نام نمایشی باید یک رشته باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'نام نمایشی نباید خالی باشد' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'رمز عبور(حداقل 6 رقم)',
        example: '123456',
    }),
    (0, class_validator_1.IsString)({ message: 'رمز عبور باید یک رشته باشد' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' }),
    (0, class_validator_1.MaxLength)(20, { message: 'رمز عبور باید حداکثر 20 کاراکتر داشته باشد' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'مقام کاربر',
        enum: role_enum_1.Role,
    }),
    (0, class_validator_1.IsEnum)(role_enum_1.Role, {
        message: 'نقش کاربر باید یکی از این مقادیر باشد: (user, admin)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
//# sourceMappingURL=create-user.dto.js.map