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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const create_category_attribute_dto_1 = require("../attributes/dto/create-category-attribute.dto");
const update_category_attribute_dto_1 = require("../attributes/dto/update-category-attribute.dto");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
const role_decorator_1 = require("../common/decorators/role.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const parse_entity_id_pipe_1 = require("../common/pipes/parse-entity-id.pipe");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(dto) {
        return this.categoriesService.create(dto);
    }
    findAll() {
        return this.categoriesService.findAll();
    }
    findAttributes(slug) {
        return this.categoriesService.findAttributesBySlug(slug);
    }
    findOne(slug) {
        return this.categoriesService.findOneBySlug(slug);
    }
    update(id, dto) {
        return this.categoriesService.update(id, dto);
    }
    deactivate(id) {
        return this.categoriesService.deactivate(id);
    }
    addAttribute(id, dto) {
        return this.categoriesService.addAttribute(id, dto);
    }
    updateAttribute(id, attributeId, dto) {
        return this.categoriesService.updateAttribute(id, attributeId, dto);
    }
    removeAttribute(id, attributeId) {
        return this.categoriesService.removeAttribute(id, attributeId);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'ایجاد دسته‌بندی (فقط مدیر)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت دسته‌بندی‌های فعال به‌صورت سلسله‌مرتب' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug/attributes'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت پیکربندی ویژگی‌های فعال دسته‌بندی' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAttributes", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت دسته‌بندی فعال بر اساس نامک' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی دسته‌بندی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'غیرفعال‌سازی دسته‌بندی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Post)(':id/attributes'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'انتساب ویژگی به دسته‌بندی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_category_attribute_dto_1.CreateCategoryAttributeDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "addAttribute", null);
__decorate([
    (0, common_1.Patch)(':id/attributes/:attributeId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'به‌روزرسانی پیکربندی ویژگی دسته‌بندی (فقط مدیر)',
    }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('attributeId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_category_attribute_dto_1.UpdateCategoryAttributeDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "updateAttribute", null);
__decorate([
    (0, common_1.Delete)(':id/attributes/:attributeId'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({ summary: 'حذف ویژگی از دسته‌بندی (فقط مدیر)' }),
    __param(0, (0, common_1.Param)('id', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __param(1, (0, common_1.Param)('attributeId', new parse_entity_id_pipe_1.ParseEntityIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "removeAttribute", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('دسته‌بندی‌ها'),
    (0, common_1.Controller)({ path: 'categories', version: '1' }),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map