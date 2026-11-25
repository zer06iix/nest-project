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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const auth_service_1 = require("./auth.service");
const response_message_decorator_1 = require("../common/decorators/response-message.decorator");
const swagger_1 = require("@nestjs/swagger");
const role_guard_1 = require("../common/guards/role.guard");
const jwt_access_guard_1 = require("./guards/jwt-access.guard");
const jwt_refresh_guard_1 = require("./guards/jwt-refresh.guard");
const get_token_decorator_1 = require("./decorators/get-token.decorator");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        const createdUser = await this.authService.register(registerDto.phoneNumber, registerDto.displayName, registerDto.password);
        return createdUser;
    }
    async login(res, loginDto) {
        const { payload, accessToken, refreshToken } = await this.authService.login(loginDto.phoneNumber, loginDto.password);
        this.setRefreshCookie(res, refreshToken);
        await this.authService.storeRefreshToken(payload.sub, refreshToken);
        return { payload, accessToken };
    }
    async logout(req, res, accessToken) {
        const user = req.user;
        await this.authService.logout(accessToken, user.id);
        res.clearCookie('refresh_token');
    }
    async refresh(req, res) {
        const userFromToken = req.user;
        const { accessToken, refreshToken } = await this.authService.refreshTokens(userFromToken.id, userFromToken.refreshToken);
        this.setRefreshCookie(res, refreshToken);
        return { accessToken };
    }
    setRefreshCookie(res, refreshToken) {
        res.cookie('refresh_token', refreshToken, {
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, response_message_decorator_1.ResponseMessage)('با موفقیت ثبت نام کردید'),
    (0, swagger_1.ApiOperation)({ summary: 'ثبت نام' }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, response_message_decorator_1.ResponseMessage)('با موفقیت وارد شدید'),
    (0, swagger_1.ApiOperation)({ summary: 'وارد شدن' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, response_message_decorator_1.ResponseMessage)('با موفقیت از حساب خود خارج شدید'),
    (0, swagger_1.ApiOperation)({ summary: 'خروج از حساب' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, get_token_decorator_1.GetToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard, role_guard_1.RoleGuard),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, response_message_decorator_1.ResponseMessage)('توکن با موفقیت تمدید شد'),
    (0, swagger_1.ApiOperation)({ summary: 'رفرش کردن توکن' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('احراز هویت'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map