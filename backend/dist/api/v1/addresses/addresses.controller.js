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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
const swagger_1 = require("@nestjs/swagger");
const create_address_dto_1 = require("./dto/create-address.dto");
const addresses_service_1 = require("./addresses.service");
const response_message_decorator_1 = require("../common/decorators/response-message.decorator");
const update_address_dto_1 = require("./dto/update-address.dto");
const role_decorator_1 = require("../common/decorators/role.decorator");
const role_enum_1 = require("../common/enums/role.enum");
let AddressesController = class AddressesController {
    addressesService;
    constructor(addressesService) {
        this.addressesService = addressesService;
    }
    async create(createAddressDto, req) {
        return await this.addressesService.create(createAddressDto, req.user.userId);
    }
    async findOne(id) {
        return await this.addressesService.findOne(id);
    }
    async findSelfAddresses(req) {
        return await this.addressesService.findUserAddresses(req.user.userId);
    }
    async findUserAddresses(userId) {
        return await this.addressesService.findUserAddresses(userId);
    }
    async findAllAddresses() {
        return await this.addressesService.findAllAddresses();
    }
    async update(updateAddressDto, id) {
        return await this.addressesService.update(id, updateAddressDto);
    }
    async remove(id) {
        await this.addressesService.remove(id);
    }
};
exports.AddressesController = AddressesController;
__decorate([
    (0, common_1.Post)(),
    (0, response_message_decorator_1.ResponseMessage)('آدرس با موفقیت ساخته شد'),
    (0, swagger_1.ApiOperation)({ summary: 'ساخت آدرس جدید' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_dto_1.CreateAddressDto, Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('ادرس با موفقیت دریافت شد'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت یک آدرس' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, common_1.Get)('user'),
    (0, response_message_decorator_1.ResponseMessage)('ادرس های کاربر با موفقیت دریافت شد'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت آدرس های کاربر درخواست کننده' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "findSelfAddresses", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('user/:id'),
    (0, response_message_decorator_1.ResponseMessage)('ادرس های کاربر با موفقیت دریافت شد'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت آدرس های یک کاربر توسط ادمین' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "findUserAddresses", null);
__decorate([
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)('ادرس های کاربران با موفقیت دریافت شد'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت آدرس های تمام کاربران توسط ادمین' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "findAllAddresses", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('ادرس با موفقیت بروزرسانی شد'),
    (0, swagger_1.ApiOperation)({ summary: 'بروزرسانی یک آدرس' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_address_dto_1.UpdateAddressDto, String]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('ادرس با موفقیت حدف شد'),
    (0, swagger_1.ApiOperation)({ summary: 'حدف کردن یک آدرس' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressesController.prototype, "remove", null);
exports.AddressesController = AddressesController = __decorate([
    (0, swagger_1.ApiTags)('آدرس‌های کاربران'),
    (0, common_1.Controller)('addresses'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [addresses_service_1.AddressesService])
], AddressesController);
//# sourceMappingURL=addresses.controller.js.map