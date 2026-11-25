"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_service_1 = require("./categories.service");
const categories_controller_1 = require("./categories.controller");
const category_entity_1 = require("./entities/category.entity");
const category_attribute_entity_1 = require("../attributes/entities/category-attribute.entity");
const attribute_entity_1 = require("../attributes/entities/attribute.entity");
const users_module_1 = require("../users/users.module");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category, category_attribute_entity_1.CategoryAttribute, attribute_entity_1.Attribute]), users_module_1.UsersModule],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService, jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard],
    })
], CategoriesModule);
//# sourceMappingURL=categories.module.js.map