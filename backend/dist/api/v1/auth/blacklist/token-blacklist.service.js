"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBlacklistService = void 0;
const common_1 = require("@nestjs/common");
let TokenBlacklistService = class TokenBlacklistService {
    blacklist = new Map();
    blacklistToken(jti, expiresInSeconds) {
        const expiresAt = Date.now() + expiresInSeconds * 1000;
        this.blacklist.set(jti, { expiresAt });
    }
    isBlacklisted(jti) {
        const entry = this.blacklist.get(jti);
        if (!entry)
            return false;
        if (Date.now() > entry.expiresAt) {
            this.blacklist.delete(jti);
            return false;
        }
        return true;
    }
};
exports.TokenBlacklistService = TokenBlacklistService;
exports.TokenBlacklistService = TokenBlacklistService = __decorate([
    (0, common_1.Injectable)()
], TokenBlacklistService);
//# sourceMappingURL=token-blacklist.service.js.map