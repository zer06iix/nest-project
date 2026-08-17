import { Inject, Injectable } from "@nestjs/common";
import { REDIS_CLIENT } from "../../common/redis/redis.constants";
import Redis from "ioredis";


interface BlacklistTokenEntry {
    expiresAt: number
}

@Injectable()
export class TokenBlacklistService {
    // constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}
    private blacklist = new Map<string, BlacklistTokenEntry>();

    async blacklistToken(jti: string, expiresInSeconds: number): Promise<void> {
        // const key = `blacklist:${jti}`

        // await this.redis.set(key, '1', 'EX', expiresInSeconds);
        // console.log(jti)
        const expiresAt = Date.now() + expiresInSeconds * 1000;
        this.blacklist.set(jti, { expiresAt });
    }

    async isBlacklisted(jti: string): Promise<boolean> {
        // const key = `blacklist:${jti}`;
        // const result = this.redis.get(key);
        // return result !== null;
        const entry = this.blacklist.get(jti);
        if (!entry) return false;

        if (Date.now() > entry.expiresAt) {
            this.blacklist.delete(jti);
            return false;
        }

        return true;
    }
}