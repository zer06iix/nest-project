import { Injectable } from '@nestjs/common';

interface BlacklistTokenEntry {
    expiresAt: number;
}

@Injectable()
export class TokenBlacklistService {
    private blacklist = new Map<string, BlacklistTokenEntry>();

    blacklistToken(jti: string, expiresInSeconds: number): void {
        const expiresAt = Date.now() + expiresInSeconds * 1000;
        this.blacklist.set(jti, { expiresAt });
    }

    isBlacklisted(jti: string): boolean {
        const entry = this.blacklist.get(jti);
        if (!entry) return false;

        if (Date.now() > entry.expiresAt) {
            this.blacklist.delete(jti);
            return false;
        }

        return true;
    }
}
