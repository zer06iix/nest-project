import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { TokenBlacklistService } from './blacklist/token-blacklist.service';
interface TokenPayload {
    sub: string;
    phone_number: string;
    display_name: string;
    role: string;
    jti: string;
}
export declare class AuthService {
    private readonly configService;
    private readonly userService;
    private readonly jwtService;
    private readonly tokenBlacklistService;
    constructor(configService: ConfigService, userService: UsersService, jwtService: JwtService, tokenBlacklistService: TokenBlacklistService);
    private buildDemoAdmin;
    register(phoneNumber: string, displayName: string, password: string): Promise<User>;
    login(phoneNumber: string, password: string): Promise<{
        payload: TokenPayload;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(token: string, id: string): Promise<null | undefined>;
    refreshTokens(id: string, incomingRefreshToken: string): Promise<{
        payload: TokenPayload;
        accessToken: string;
        refreshToken: string;
    }>;
    storeRefreshToken(id: string, refreshToken: string): Promise<void>;
    private generateTokens;
}
export {};
