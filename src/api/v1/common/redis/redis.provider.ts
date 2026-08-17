import { Logger, Provider } from "@nestjs/common";
import { Redis } from "ioredis";
import { REDIS_CLIENT } from "./redis.constants";


const logger = new Logger('RedisProvider')

export const RedisProvider: Provider = {
    provide: REDIS_CLIENT,
    useFactory: () => {
        const client = new Redis({
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