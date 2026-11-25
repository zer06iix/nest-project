export declare class TokenBlacklistService {
    private blacklist;
    blacklistToken(jti: string, expiresInSeconds: number): void;
    isBlacklisted(jti: string): boolean;
}
