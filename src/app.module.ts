import { Module, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { SentryModule } from '@sentry/nestjs/setup'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/v1/users/users.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { LoggerMiddleware } from './api/v1/common/middlewares/logger.middleware';
import { UsersController } from './api/v1/users/users.controller';
// import { RedisModule } from './api/v1/redis/redis.module';
import { TokenBlacklistModule } from './api/v1/auth/blacklist/token-blacklist.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        // SentryModule.forRoot(),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),

        UsersModule,
        AuthModule,
        // RedisModule,
        TokenBlacklistModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(UsersController)
    }
}
