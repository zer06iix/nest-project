import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { TokenBlacklistService } from '../blacklist/token-blacklist.service';
declare const JwtAccessStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private readonly tokenBlacklistService;
    constructor(configService: ConfigService, tokenBlacklistService: TokenBlacklistService);
    validate(payload: Record<string, unknown>): {
        id: string;
        phone_number: string;
        display_name: string;
        role: string;
    };
}
export {};
