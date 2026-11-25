"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../common/guards/role.guard");
const category_entity_1 = require("../categories/entities/category.entity");
const category_attribute_entity_1 = require("../attributes/entities/category-attribute.entity");
const attribute_entity_1 = require("../attributes/entities/attribute.entity");
const attribute_option_entity_1 = require("../attributes/entities/attribute-option.entity");
const store_product_entity_1 = require("../stores/entities/store-product.entity");
const brand_entity_1 = require("./entities/brand.entity");
const product_entity_1 = require("./entities/product.entity");
const product_variant_entity_1 = require("./entities/product-variant.entity");
const product_image_entity_1 = require("./entities/product-image.entity");
const product_attribute_value_entity_1 = require("./entities/product-attribute-value.entity");
const variant_attribute_value_entity_1 = require("./entities/variant-attribute-value.entity");
const product_identifier_entity_1 = require("./entities/product-identifier.entity");
const brands_controller_1 = require("./brands.controller");
const products_controller_1 = require("./products.controller");
const brands_service_1 = require("./brands.service");
const products_service_1 = require("./products.service");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                brand_entity_1.Brand,
                product_entity_1.Product,
                product_variant_entity_1.ProductVariant,
                product_image_entity_1.ProductImage,
                product_attribute_value_entity_1.ProductAttributeValue,
                variant_attribute_value_entity_1.VariantAttributeValue,
                product_identifier_entity_1.ProductIdentifier,
                category_entity_1.Category,
                category_attribute_entity_1.CategoryAttribute,
                attribute_entity_1.Attribute,
                attribute_option_entity_1.AttributeOption,
                store_product_entity_1.StoreProduct,
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [brands_controller_1.BrandsController, products_controller_1.ProductsController],
        providers: [brands_service_1.BrandsService, products_service_1.ProductsService, jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map