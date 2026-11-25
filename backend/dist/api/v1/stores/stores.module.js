"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
const product_entity_1 = require("../products/entities/product.entity");
const product_variant_entity_1 = require("../products/entities/product-variant.entity");
const store_entity_1 = require("./entities/store.entity");
const store_product_entity_1 = require("./entities/store-product.entity");
const price_entity_1 = require("./entities/price.entity");
const price_history_entity_1 = require("./entities/price-history.entity");
const stores_controller_1 = require("./stores.controller");
const stores_service_1 = require("./stores.service");
const store_products_controller_1 = require("./store-products.controller");
let StoresModule = class StoresModule {
};
exports.StoresModule = StoresModule;
exports.StoresModule = StoresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                store_entity_1.Store,
                store_product_entity_1.StoreProduct,
                product_entity_1.Product,
                product_variant_entity_1.ProductVariant,
                price_entity_1.Price,
                price_history_entity_1.PriceHistory,
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [stores_controller_1.StoresController, store_products_controller_1.StoreProductsController],
        providers: [stores_service_1.StoresService, jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard],
        exports: [stores_service_1.StoresService],
    })
], StoresModule);
//# sourceMappingURL=stores.module.js.map