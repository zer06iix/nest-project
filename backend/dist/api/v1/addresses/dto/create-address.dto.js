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
exports.CreateAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAddressDto {
    province;
    city;
    address;
    postalCode;
    receiverMobile;
    description;
}
exports.CreateAddressDto = CreateAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'استان',
        example: 'خراسان رضوی',
    }),
    (0, class_validator_1.IsString)({ message: 'استان باید یک رشته باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'استان نباید خالی باشد' }),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'شهر',
        example: 'مشهد',
    }),
    (0, class_validator_1.IsString)({ message: 'شهر باید یک رشته باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'شهر نباید خالی باشد' }),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ادرس',
        example: 'خیابان هفت تیر',
    }),
    (0, class_validator_1.IsString)({ message: 'ادرس باید یک رشته باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ادرس نباید خالی باشد' }),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'کد پستی',
        example: '5682971357',
    }),
    (0, class_validator_1.IsString)({ message: 'کد پستی باید یک رشته باشد' }),
    (0, class_validator_1.Length)(10, 10, { message: 'کد پستی باید 10 رقم باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'کد پستی نباید خالی باشد' }),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'شماره تماس 11 رقمی',
        example: '09124678266',
    }),
    (0, class_validator_1.IsString)({ message: 'شماره موبایل باید یک رشته باشد' }),
    (0, class_validator_1.Matches)(/^.{11}$/, { message: 'شماره موبایل باید 11 رقم باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'شماره موبایل نباید خالی باشد' }),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "receiverMobile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'توضیحات',
        example: '',
    }),
    (0, class_validator_1.IsString)({ message: 'توضیحات باید یک رشته باشد' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "description", void 0);
//# sourceMappingURL=create-address.dto.js.map