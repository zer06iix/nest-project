"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [(0, path_1.join)(__dirname, 'api/v1/**/*.entity{.ts,.js}')],
    migrations: [(0, path_1.join)(__dirname, 'database/migrations/*{.ts,.js}')],
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
});
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map