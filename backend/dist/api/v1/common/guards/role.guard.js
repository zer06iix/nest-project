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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_decorator_1 = require("../decorators/role.decorator");
const users_service_1 = require("../../users/users.service");
const role_enum_1 = require("../enums/role.enum");
const demo_login_1 = require("../utils/demo-login");
let RoleGuard = class RoleGuard {
    reflector;
    userService;
    constructor(reflector, userService) {
        this.reflector = reflector;
        this.userService = userService;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles)
            return true;
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        if (!user?.id) {
            throw new common_1.ForbiddenException('کاربر احراز هویت نشده است');
        }
        const role = (0, demo_login_1.isDemoAdminId)(user.id)
            ? role_enum_1.Role.ADMIN
            : (await this.userService.findOneById(user.id)).role;
        const hasRole = requiredRoles.includes(role);
        if (!hasRole)
            throw new common_1.ForbiddenException('شما دسترسی لازم را برای این صفحه ندارید');
        return true;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        users_service_1.UsersService])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map