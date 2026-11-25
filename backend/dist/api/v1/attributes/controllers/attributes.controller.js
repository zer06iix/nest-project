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
exports.AttributesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attributes_service_1 = require("../services/attributes.service");
const create_attribute_dto_1 = require("../dto/create-attribute.dto");
const update_attribute_dto_1 = require("../dto/update-attribute.dto");
const create_attribute_option_dto_1 = require("../dto/create-attribute-option.dto");
const update_attribute_option_dto_1 = require("../dto/update-attribute-option.dto");
const jwt_access_guard_1 = require("../../auth/guards/jwt-access.guard");
const role_guard_1 = require("../../common/guards/role.guard");
const role_decorator_1 = require("../../common/decorators/role.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const parse_entity_id_pipe_1 = require("../../common/pipes/parse-entity-id.pipe");
let AttributesController = class AttributesController {
    attributesService;
    constructor(attributesService) {
        this.attributesService = attributesService;
    }
    create(dto) {
        return this.attributesService.create(dto);
    }
    findAll() {
        return this.attributesService.findAll();
    }
    findOptions(id) {
        return this.attributesService.findOptions(id);
    }
    findOne(id) {
        return this.attributesService.findOne(id);
    }
    update(id, dto) {
        return this.attributesService.update(id, dto);
    }
    deactivate(id) {
        return this.attributesService.deactivate(id);
    }
    createOption(id, dto) {
        return this.attributesService.createOption(id, dto);
    }
    updateOption(optionId, dto) {
        return this.attributesService.updateOption(optionId, dto);
    }
    deactivateOption(optionId) {
        return this.attributesService.deactivateOption(optionId);
    }
};
exports.AttributesController = AttributesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'ایجاد ویژگی (فقط مدیر)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_dto_1.CreateAttributeDto]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت ویژگی‌های فعال' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/options'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت گزینه‌های فعال ویژگی' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "findOptions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت ویژگی فعال' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی ویژگی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_dto_1.UpdateAttributeDto]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'غیرفعال‌سازی ویژگی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Post)(':id/options'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'ایجاد گزینه برای ویژگی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_attribute_option_dto_1.CreateAttributeOptionDto]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "createOption", null);
__decorate([
    (0, common_1.Patch)('options/:optionId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی گزینه ویژگی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('optionId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_option_dto_1.UpdateAttributeOptionDto]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "updateOption", null);
__decorate([
    (0, common_1.Delete)('options/:optionId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'غیرفعال‌سازی گزینه ویژگی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('optionId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributesController.prototype, "deactivateOption", null);
exports.AttributesController = AttributesController = __decorate([
    (0, swagger_1.ApiTags)('ویژگی‌ها'),
    (0, common_1.Controller)({ path: 'attributes', version: '1' }),
    __metadata("design:paramtypes", [attributes_service_1.AttributesService])
], AttributesController);
//# sourceMappingURL=attributes.controller.js.map