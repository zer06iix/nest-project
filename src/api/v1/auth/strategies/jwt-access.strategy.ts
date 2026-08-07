import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokenBlacklistService } from '../blacklist/token-blacklist.service';


@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(
        configService: ConfigService,
        private readonly tokenBlacklistService: TokenBlacklistService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET')
        })
    }

    async validate(payload: any) {const isBlacklisted = await this.tokenBlacklistService.isBlacklisted(payload.jti);

        if (isBlacklisted)
            throw new UnauthorizedException('دوباره وارد شوید');

        return {
            userId: payload.sub,
            phone_number: payload.phone_number,
            display_name: payload.display_name,
            role: payload.role,
        }
    }
}