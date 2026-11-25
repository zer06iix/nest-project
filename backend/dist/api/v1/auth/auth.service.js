"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const config_1 = require("@nestjs/config");
const role_enum_1 = require("../common/enums/role.enum");
const token_blacklist_service_1 = require("./blacklist/token-blacklist.service");
const demo_login_1 = require("../common/utils/demo-login");
let AuthService = class AuthService {
    configService;
    userService;
    jwtService;
    tokenBlacklistService;
    constructor(configService, userService, jwtService, tokenBlacklistService) {
        this.configService = configService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.tokenBlacklistService = tokenBlacklistService;
    }
    buildDemoAdmin() {
        return {
            id: demo_login_1.DEMO_ADMIN_ID,
            phoneNumber: '',
            displayName: demo_login_1.DEMO_ADMIN_DISPLAY_NAME,
            role: role_enum_1.Role.ADMIN,
        };
    }
    async register(phoneNumber, displayName, password) {
        const createUserDto = {
            phoneNumber,
            displayName,
            password,
        };
        const newUser = await this.userService.create(createUserDto);
        return newUser;
    }
    async login(phoneNumber, password) {
        if ((0, demo_login_1.isEmptyDemoLogin)({ phoneNumber, password })) {
            return this.generateTokens(this.buildDemoAdmin());
        }
        const user = await this.userService.findOneByPhone(phoneNumber);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('مشخصات وارد شده اشتباه است');
        }
        return this.generateTokens(user);
    }
    async logout(token, id) {
        const decoded = this.jwtService.decode(token);
        if (!(0, demo_login_1.isDemoAdminId)(id))
            await this.userService.updateHashedRefreshToken(id, null);
        if (!decoded?.jti || !decoded?.exp)
            return;
        const secondsRemaining = decoded.exp - Math.floor(Date.now() / 1000);
        if (secondsRemaining > 0)
            this.tokenBlacklistService.blacklistToken(decoded.jti, secondsRemaining);
        return null;
    }
    async refreshTokens(id, incomingRefreshToken) {
        if ((0, demo_login_1.isDemoAdminId)(id)) {
            return this.generateTokens(this.buildDemoAdmin());
        }
        const user = await this.userService.findOneById(id);
        if (!user || !user.hashedRefreshToken) {
            throw new common_1.UnauthorizedException('لطفا دوباره وارد شوید');
        }
        const tokenMatches = await bcrypt.compare(incomingRefreshToken, user.hashedRefreshToken);
        if (!tokenMatches) {
            await this.userService.updateHashedRefreshToken(id, null);
        }
        const tokens = await this.generateTokens(user);
        await this.storeRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async storeRefreshToken(id, refreshToken) {
        if ((0, demo_login_1.isDemoAdminId)(id))
            return;
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.userService.updateHashedRefreshToken(id, hashed);
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            phone_number: user.phoneNumber,
            display_name: user.displayName,
            role: user.role,
            jti: (0, uuid_1.v4)(),
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRATION'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRATION'),
            }),
        ]);
        return { payload, accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        token_blacklist_service_1.TokenBlacklistService])
], AuthService);
//# sourceMappingURL=auth.service.js.map