"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisProvider = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const redis_constants_1 = require("./redis.constants");
const logger = new common_1.Logger('RedisProvider');
exports.RedisProvider = {
    provide: redis_constants_1.REDIS_CLIENT,
    useFactory: () => {
        const client = new ioredis_1.Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
            maxRetriesPerRequest: 3,
        });
        client.on('connect', () => logger.log('Redis connected'));
        client.on('error', (err) => logger.error('Redis connection error', err));
        return client;
    },
};
//# sourceMappingURL=redis.provider.js.map