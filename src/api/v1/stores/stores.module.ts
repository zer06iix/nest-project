import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { Store } from './entities/store.entity';
import { StoreProduct } from './entities/store-product.entity';
import { Price } from './entities/price.entity';
import { PriceHistory } from './entities/price-history.entity';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { StoreProductsController } from './store-products.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Store, StoreProduct, Product, ProductVariant, Price, PriceHistory]),
        UsersModule,
    ],
    controllers: [StoresController, StoreProductsController],
    providers: [StoresService, JwtAccessGuard, RoleGuard],
    exports: [StoresService],
})
export class StoresModule {}
