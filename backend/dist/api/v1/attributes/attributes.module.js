"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attributes_service_1 = require("./services/attributes.service");
const attributes_controller_1 = require("./controllers/attributes.controller");
const attribute_entity_1 = require("./entities/attribute.entity");
const attribute_option_entity_1 = require("./entities/attribute-option.entity");
const users_module_1 = require("../users/users.module");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
let AttributesModule = class AttributesModule {
};
exports.AttributesModule = AttributesModule;
exports.AttributesModule = AttributesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attribute_entity_1.Attribute, attribute_option_entity_1.AttributeOption]), users_module_1.UsersModule],
        controllers: [attributes_controller_1.AttributesController],
        providers: [attributes_service_1.AttributesService, jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard],
    })
], AttributesModule);
//# sourceMappingURL=attributes.module.js.map