import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { Request } from "express";


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: (req: Request) => req?.cookies?.refresh_token ?? null,
            secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
            ignoreExpiration: false,
            passReqToCallback: true,
        })
    }

    validate(req: Request, payload: any) {
        const refreshToken = req.cookies?.refresh_token;
        return {
            id: payload.sub,
            phoneNumber: payload.phone_number,
            refreshToken,
        }
    }
}