import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { StoreProduct } from '../stores/entities/store-product.entity';
import { Store } from '../stores/entities/store.entity';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { Product } from '../products/entities/product.entity';
import { Price } from '../stores/entities/price.entity';
import { Address } from '../addresses/entities/address.entity';
import { ShippingMethod } from '../stores/entities/shipping-method.entity';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CheckoutValidationService } from './services/checkout-validation.service';
import { CheckoutPricingService } from './services/checkout-pricing.service';
import { CartModule } from '../cart/cart.module';
import { StoresModule } from '../stores/stores.module';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      CartItem,
      StoreProduct,
      Store,
      ProductVariant,
      Product,
      Price,
      Address,
      ShippingMethod,
    ]),
    CartModule,
    StoresModule,
    AddressesModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService, CheckoutValidationService, CheckoutPricingService],
  exports: [CheckoutService],
})
export class CheckoutModule {}