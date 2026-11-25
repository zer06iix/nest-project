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
exports.JwtAccessStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const passport_jwt_1 = require("passport-jwt");
const token_blacklist_service_1 = require("../blacklist/token-blacklist.service");
let JwtAccessStrategy = class JwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-access') {
    tokenBlacklistService;
    constructor(configService, tokenBlacklistService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
        });
        this.tokenBlacklistService = tokenBlacklistService;
    }
    validate(payload) {
        const isBlacklisted = this.tokenBlacklistService.isBlacklisted(payload.jti);
        if (isBlacklisted)
            throw new common_1.UnauthorizedException('دوباره وارد شوید');
        return {
            id: payload.sub,
            phone_number: payload.phone_number,
            display_name: payload.display_name,
            role: payload.role,
        };
    }
};
exports.JwtAccessStrategy = JwtAccessStrategy;
exports.JwtAccessStrategy = JwtAccessStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        token_blacklist_service_1.TokenBlacklistService])
], JwtAccessStrategy);
//# sourceMappingURL=jwt-access.strategy.js.map