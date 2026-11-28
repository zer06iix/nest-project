import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, IsNull } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { CartItem } from '../../cart/entities/cart-item.entity';
import { CartStatus } from '../../cart/enums/cart-status.enum';
import { StoreProduct } from '../../stores/entities/store-product.entity';
import { Store } from '../../stores/entities/store.entity';
import { ProductVariant } from '../../products/entities/product-variant.entity';
import { Product } from '../../products/entities/product.entity';
import { Price } from '../../stores/entities/price.entity';
import { Address } from '../../addresses/entities/address.entity';
import { ShippingMethod } from '../../stores/entities/shipping-method.entity';
import { CartNotFoundException, CartEmptyException, CartInactiveException } from '../exceptions/checkout.exceptions';
import { InvalidCartItemException } from '../exceptions/checkout.exceptions';
import { StoreProductNotFoundException } from '../exceptions/checkout.exceptions';
import { StoreProductUnavailableException } from '../exceptions/checkout.exceptions';
import { StoreInactiveException } from '../exceptions/checkout.exceptions';
import { ProductVariantInactiveException } from '../exceptions/checkout.exceptions';
import { InsufficientInventoryException } from '../exceptions/checkout.exceptions';
import { InvalidPriceException } from '../exceptions/checkout.exceptions';
import { ShippingAddressNotFoundException } from '../exceptions/checkout.exceptions';
import { ShippingAddressOwnershipException } from '../exceptions/checkout.exceptions';
import { ShippingMethodNotFoundException } from '../exceptions/checkout.exceptions';
import { ShippingMethodUnavailableException } from '../exceptions/checkout.exceptions';
import { MissingShippingSelectionException } from '../exceptions/checkout.exceptions';
import { CheckoutWarning } from '../interfaces/checkout-summary.interface';

export interface ValidatedCartData {
  cart: Cart;
  items: CartItem[];
  storeProducts: Map<string, StoreProduct>;
  stores: Map<string, Store>;
  variants: Map<string, ProductVariant>;
  products: Map<string, Product>;
  prices: Map<string, Price>;
  warnings: CheckoutWarning[];
}

export interface ValidatedShippingData {
  address: Address;
  shippingMethods: Map<string, ShippingMethod>;
  shippingSelections: Array<{ storeId: string; shippingMethodId: string }>;
}

@Injectable()
export class CheckoutValidationService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(StoreProduct)
    private readonly storeProductRepository: Repository<StoreProduct>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodRepository: Repository<ShippingMethod>,
  ) {}

  async validateCart(
    userId: string | undefined,
    sessionId: string | undefined,
  ): Promise<ValidatedCartData> {
    // First try to find cart by userId (for authenticated users)
    // If not found and sessionId provided, try sessionId (for guest carts that might be merged)
    let cart: Cart | null = null;

    if (userId) {
      cart = await this.cartRepository.findOne({
        where: { userId, status: CartStatus.ACTIVE },
        relations: {
          items: {
            storeProduct: {
              price: true,
              store: true,
              productVariant: {
                product: true,
              },
            },
          },
        },
      });
    }

    if (!cart && sessionId) {
      cart = await this.cartRepository.findOne({
        where: { sessionId, status: CartStatus.ACTIVE },
        relations: {
          items: {
            storeProduct: {
              price: true,
              store: true,
              productVariant: {
                product: true,
              },
            },
          },
        },
      });
    }

    if (!cart) {
      throw new CartNotFoundException();
    }

    if (cart.status !== CartStatus.ACTIVE) {
      throw new CartInactiveException();
    }

    if (!cart.items || cart.items.length === 0) {
      throw new CartEmptyException();
    }

    const storeProductIds = cart.items.map((item) => item.storeProductId);
    const uniqueStoreProductIds = [...new Set(storeProductIds)];

    const storeProducts = await this.storeProductRepository.find({
      where: { id: In(uniqueStoreProductIds) },
      relations: {
        store: true,
        productVariant: { product: true },
        price: true,
      },
    });

    const storeProductMap = new Map(storeProducts.map((sp) => [sp.id, sp]));

    const storeIds = [...new Set(storeProducts.map((sp) => sp.storeId))];
    const stores = await this.storeRepository.findBy({ id: In(storeIds) });
    const storeMap = new Map(stores.map((s) => [s.id, s]));

    const variantIds = [...new Set(storeProducts.map((sp) => sp.productVariantId))];
    const variants = await this.variantRepository.findBy({ id: In(variantIds) });
    const variantMap = new Map(variants.map((v) => [v.id, v]));

    const productIds = [...new Set(variants.map((v) => v.productId))];
    const products = await this.productRepository.findBy({ id: In(productIds) });
    const productMap = new Map(products.map((p) => [p.id, p]));

    const prices = await this.priceRepository.findBy({ storeProductId: In(uniqueStoreProductIds) });
    const priceMap = new Map(prices.map((p) => [p.storeProductId, p]));

    const warnings: CheckoutWarning[] = [];

    for (const item of cart.items) {
      const storeProduct = storeProductMap.get(item.storeProductId);

      if (!storeProduct) {
        throw new InvalidCartItemException(
          `Store product ${item.storeProductId} no longer exists`,
          item.id,
        );
      }

      if (storeProduct.deletedAt) {
        throw new StoreProductUnavailableException(item.storeProductId, 'Product has been deleted');
      }

      if (!storeProduct.isActive) {
        throw new StoreProductUnavailableException(item.storeProductId, 'Product is not active');
      }

      if (storeProduct.status !== 'ACTIVE') {
        throw new StoreProductUnavailableException(
          item.storeProductId,
          `Product status is ${storeProduct.status}`,
        );
      }

      const store = storeMap.get(storeProduct.storeId);
      if (!store || store.status !== 'ACTIVE') {
        throw new StoreInactiveException(storeProduct.storeId);
      }

      const variant = variantMap.get(storeProduct.productVariantId);
      if (!variant || !variant.isActive) {
        throw new ProductVariantInactiveException(storeProduct.productVariantId);
      }

      const product = productMap.get(variant.productId);
      if (!product || product.status !== 'ACTIVE') {
        throw new StoreProductUnavailableException(
          item.storeProductId,
          'Parent product is not active',
        );
      }

      const price = priceMap.get(item.storeProductId);
      if (!price) {
        throw new InvalidPriceException(item.storeProductId, 'No price configured');
      }

      if (Number(price.amount) <= 0) {
        throw new InvalidPriceException(item.storeProductId, 'Price must be positive');
      }

      if (storeProduct.stockQuantity !== null && storeProduct.stockQuantity < item.quantity) {
        throw new InsufficientInventoryException(
          item.storeProductId,
          item.quantity,
          storeProduct.stockQuantity,
        );
      }

      if (
        storeProduct.availabilityStatus === 'OUT_OF_STOCK' ||
        storeProduct.availabilityStatus === 'DISCONTINUED'
      ) {
        throw new StoreProductUnavailableException(
          item.storeProductId,
          `Availability: ${storeProduct.availabilityStatus}`,
        );
      }

      if (storeProduct.stockQuantity !== null && storeProduct.stockQuantity <= 5 && storeProduct.stockQuantity > 0) {
        warnings.push({
          type: 'LOW_STOCK',
          message: `Only ${storeProduct.stockQuantity} units left in stock`,
          storeId: storeProduct.storeId,
          storeProductId: item.storeProductId,
          cartItemId: item.id,
        });
      }
    }

    return {
      cart,
      items: cart.items,
      storeProducts: storeProductMap,
      stores: storeMap,
      variants: variantMap,
      products: productMap,
      prices: priceMap,
      warnings,
    };
  }

  async validateShippingAddress(
    addressId: string,
    userId: string | null,
  ): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id: addressId },
      relations: { user: true },
    });

    if (!address) {
      throw new ShippingAddressNotFoundException(addressId);
    }

    if (userId && address.user?.id !== userId) {
      throw new ShippingAddressOwnershipException(addressId);
    }

    return address;
  }

  async validateShippingSelections(
    storeIds: string[],
    shippingSelections: Array<{ storeId: string; shippingMethodId: string }>,
  ): Promise<Map<string, ShippingMethod>> {
    const allMethodIds = shippingSelections.map((s) => s.shippingMethodId);
    const shippingMethods = await this.shippingMethodRepository.find({
      where: { id: In(allMethodIds), isActive: true },
    });

    const methodMap = new Map(shippingMethods.map((m) => [m.id, m]));

    for (const storeId of storeIds) {
      const selection = shippingSelections.find((s) => s.storeId === storeId);
      if (!selection) {
        throw new MissingShippingSelectionException(storeId);
      }

      const method = methodMap.get(selection.shippingMethodId);
      if (!method) {
        throw new ShippingMethodNotFoundException(selection.shippingMethodId);
      }

      if (method.storeId !== storeId) {
        throw new ShippingMethodUnavailableException(
          storeId,
          selection.shippingMethodId,
          'Shipping method does not belong to this store',
        );
      }

      if (!method.isActive) {
        throw new ShippingMethodUnavailableException(
          storeId,
          selection.shippingMethodId,
          'Shipping method is not active',
        );
      }
    }

    return methodMap;
  }
}