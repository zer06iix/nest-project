import { Injectable, UnauthorizedException } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { ConfigService } from "@nestjs/config";
import { User } from "../users/entities/user.entity";
import { TokenBlacklistService } from "./blacklist/token-blacklist.service";


@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly tokenBlacklistService: TokenBlacklistService,
    ) {}
    
    async register(phoneNumber: string, displayName: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await this.userService.create({
            phoneNumber,
            displayName,
            password: hashedPassword,
        });

        return newUser;
    }

    async login(phoneNumber: string, password: string) {
        const user = await this.userService.findOneByPhone(phoneNumber);
        if (!(await bcrypt.compare(password, user.password)) || !user)
            throw new UnauthorizedException("مشخصات وارد شده اشتباه است");

        return this.generateTokens(user);
    }

    async logout(token: string, id: string) {
        const decoded = this.jwtService.decode(token) as { jti: string, exp: number };
        await this.userService.updateHashedRefreshToken(id, null);
        
        if (!decoded?.jti || !decoded?.exp) return;

        const secondsRemaining = decoded.exp - Math.floor((Date.now() / 1000))

        if (secondsRemaining > 0) 
            return await this.tokenBlacklistService
                .blacklistToken(decoded.jti, secondsRemaining);
                
        return null;
    }

    async refreshTokens(id: string, incomingRefreshToken: string) {
        const user = await this.userService.findOneById(id);
        
        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException('لطفا دوباره وارد شوید');
        }

        const tokenMatches = await bcrypt.compare(incomingRefreshToken, user.hashedRefreshToken);
        if (!tokenMatches) {
            await this.userService.updateHashedRefreshToken(id, null);
        }

        const tokens = await this.generateTokens(user);
        await this.storeRefreshToken(user.id, tokens.refreshToken)
        return tokens;
    }

    async storeRefreshToken(id: string, refreshToken: string) {
        const hashed = await bcrypt.hash(refreshToken, 5);
        await this.userService.updateHashedRefreshToken(id, hashed);
    }

    private async generateTokens(user: User) {
        const payload = {
            sub: user.id,
            phone_number: user.phoneNumber,
            display_name: user.displayName,
            role: user.role,
            jti: uuidV4(),
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRATION'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRATION'),
            }),
        ])

        return {payload, accessToken, refreshToken }
    }
}
