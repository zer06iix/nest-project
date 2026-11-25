"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./api/v1/users/users.module");
const auth_module_1 = require("./api/v1/auth/auth.module");
const addresses_module_1 = require("./api/v1/addresses/addresses.module.js");
const tickets_module_1 = require("./api/v1/tickets/tickets.module.js");
const token_blacklist_module_1 = require("./api/v1/auth/blacklist/token-blacklist.module");
const logger_middleware_1 = require("./api/v1/common/middlewares/logger.middleware");
const categories_module_1 = require("./api/v1/categories/categories.module");
const attributes_module_1 = require("./api/v1/attributes/attributes.module");
const products_module_1 = require("./api/v1/products/products.module");
const stores_module_1 = require("./api/v1/stores/stores.module");
const cart_module_1 = require("./api/v1/cart/cart.module.js");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('users', 'addresses', 'tickets');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                }),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            addresses_module_1.AddressesModule,
            tickets_module_1.TicketsModule,
            token_blacklist_module_1.TokenBlacklistModule,
            categories_module_1.CategoriesModule,
            attributes_module_1.AttributesModule,
            products_module_1.ProductsModule,
            stores_module_1.StoresModule,
            cart_module_1.CartModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map