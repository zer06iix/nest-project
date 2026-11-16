import { Module, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { SentryModule } from '@sentry/nestjs/setup'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/v1/users/users.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { AddressesModule } from 'api/v1/addresses/addresses.module';
import { TicketsModule } from 'api/v1/tickets/tickets.module';
// import { RedisModule } from './api/v1/redis/redis.module';
import { TokenBlacklistModule } from './api/v1/auth/blacklist/token-blacklist.module';
import { LoggerMiddleware } from './api/v1/common/middlewares/logger.middleware';
import { CategoriesModule } from './api/v1/categories/categories.module';
import { AttributesModule } from './api/v1/attributes/attributes.module';

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
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                // autoLoadEntities: true,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
                migrationsRun: configService.get<string>('NODE_ENV') === 'production',
                synchronize: configService.get<string>('NODE_ENV') !== 'production',
            }),
        }),

        UsersModule,
        AuthModule,
        AddressesModule,
        TicketsModule,
        // RedisModule,
        TokenBlacklistModule,
        CategoriesModule,
        AttributesModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                'users',
                'addresses',
                'tickets',
            )
    }
}
