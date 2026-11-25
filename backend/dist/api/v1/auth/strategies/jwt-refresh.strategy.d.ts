import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
interface JwtRefreshPayload {
    sub: string;
    phone_number: string;
}
interface RequestWithCookies extends Request {
    cookies: Record<string, string>;
}
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor(configService: ConfigService);
    validate(req: RequestWithCookies, payload: JwtRefreshPayload): {
        id: string;
        phoneNumber: string;
        refreshToken: string;
    };
}
export {};
