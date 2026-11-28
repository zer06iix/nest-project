import { Injectable } from '@nestjs/common';
import {
  ValidatedCartData,
  ValidatedShippingData,
} from './checkout-validation.service';
import { CartItem } from '../../cart/entities/cart-item.entity';
import { StoreProduct } from '../../stores/entities/store-product.entity';
import { Store } from '../../stores/entities/store.entity';
import { ProductVariant } from '../../products/entities/product-variant.entity';
import { Product } from '../../products/entities/product.entity';
import { Price } from '../../stores/entities/price.entity';
import { ShippingMethod } from '../../stores/entities/shipping-method.entity';
import {
  CheckoutItemSummary,
  StoreCheckoutSummary,
  CheckoutSummary,
  CheckoutWarning,
  StoreShippingSelection,
  ShippingMethodData,
} from '../interfaces/checkout-summary.interface';

export interface PricingResult {
  summary: CheckoutSummary;
  storeSummaries: StoreCheckoutSummary[];
  itemSummaries: CheckoutItemSummary[];
}

@Injectable()
export class CheckoutPricingService {
  private readonly DEFAULT_CURRENCY = 'IRR';
  private readonly DECIMAL_PRECISION = 6;

  calculate(
    cartData: ValidatedCartData,
    shippingData: ValidatedShippingData,
    couponCode: string | null,
  ): PricingResult {
    const { items, storeProducts, stores, variants, products, prices, warnings } = cartData;
    const { shippingMethods, shippingSelections } = shippingData;

    const itemsByStore = new Map<string, CartItem[]>();
    for (const item of items) {
      const storeProduct = storeProducts.get(item.storeProductId);
      if (!storeProduct) continue;
      const storeId = storeProduct.storeId;
      if (!itemsByStore.has(storeId)) {
        itemsByStore.set(storeId, []);
      }
      itemsByStore.get(storeId)!.push(item);
    }

    const storeSummaries: StoreCheckoutSummary[] = [];
    const itemSummaries: CheckoutItemSummary[] = [];

    for (const [storeId, storeItems] of itemsByStore.entries()) {
      const store = stores.get(storeId);
      if (!store) continue;

      let storeSubtotal = '0';
      const storeItemSummaries: CheckoutItemSummary[] = [];

      for (const item of storeItems) {
        const storeProduct = storeProducts.get(item.storeProductId);
        const price = prices.get(item.storeProductId);
        const variant = storeProduct ? variants.get(storeProduct.productVariantId) : undefined;
        const product = variant ? products.get(variant.productId) : undefined;

        if (!storeProduct || !price || !variant || !product) continue;

        const unitPrice = price.amount;
        const originalUnitPrice = price.originalAmount;
        const currency = price.currency ?? this.DEFAULT_CURRENCY;
        const itemTotal = this.multiply(unitPrice, item.quantity);

        storeSubtotal = this.add(storeSubtotal, itemTotal);

        const itemSummary: CheckoutItemSummary = {
          cartItemId: item.id,
          storeProductId: storeProduct.id,
          storeId: storeProduct.storeId,
          storeName: store.name,
          storeSlug: store.slug,
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          variantId: variant.id,
          variantTitle: variant.title,
          variantSku: variant.sku,
          quantity: item.quantity,
          unitPrice,
          originalUnitPrice,
          currency,
          itemTotal,
          availabilityStatus: storeProduct.availabilityStatus,
          stockStatus: storeProduct.stockStatus,
          stockQuantity: storeProduct.stockQuantity,
          isAvailable: this.isAvailable(storeProduct),
          priceChanged: false,
          availabilityChanged: false,
          storeProductTitle: storeProduct.title,
          storeProductDescription: storeProduct.description,
        };

        storeItemSummaries.push(itemSummary);
        itemSummaries.push(itemSummary);
      }

      const selection = shippingSelections.find((s) => s.storeId === storeId);
      let shippingCost = '0';
      let shippingMethodName = '';
      let shippingMethodData: ShippingMethodData | null = null;

      if (selection) {
        const method = shippingMethods.get(selection.shippingMethodId);
        if (method) {
          shippingCost = method.cost;
          shippingMethodName = method.name;
          shippingMethodData = {
            id: method.id,
            storeId: method.storeId,
            name: method.name,
            description: method.description,
            cost: method.cost,
            currency: method.currency,
            estimatedDeliveryDays: method.estimatedDeliveryDays,
            isActive: method.isActive,
            minOrderAmount: method.minOrderAmount,
            maxOrderAmount: method.maxOrderAmount,
            conditions: method.conditions,
          };
        }
      }

      const discount = '0';
      const total = this.subtract(this.add(storeSubtotal, shippingCost), discount);

      const shippingSelection: StoreShippingSelection | null = selection
        ? {
            storeId,
            shippingMethodId: selection.shippingMethodId,
            shippingMethodName,
            shippingCost,
            estimatedDeliveryDays: shippingMethodData?.estimatedDeliveryDays ?? null,
          }
        : null;

      storeSummaries.push({
        storeId,
        storeName: store.name,
        storeSlug: store.slug,
        storeLogo: store.logo,
        items: storeItemSummaries,
        subtotal: storeSubtotal,
        shippingCost,
        discount,
        total,
        currency: this.DEFAULT_CURRENCY,
        itemCount: storeItems.length,
        shippingSelection,
      });
    }

    const overallSubtotal = storeSummaries.reduce(
      (sum, s) => this.add(sum, s.subtotal),
      '0',
    );
    const overallShippingCost = storeSummaries.reduce(
      (sum, s) => this.add(sum, s.shippingCost),
      '0',
    );
    const overallDiscount = storeSummaries.reduce(
      (sum, s) => this.add(sum, s.discount),
      '0',
    );

    let couponDiscount = '0';
    if (couponCode) {
      couponDiscount = this.calculateCouponDiscount(couponCode, overallSubtotal);
    }

    const finalPayableAmount = this.subtract(
      this.add(overallSubtotal, overallShippingCost),
      this.add(overallDiscount, couponDiscount),
    );

    const allWarnings: CheckoutWarning[] = [
      ...warnings,
      ...this.generatePriceChangeWarnings(itemSummaries, cartData),
    ];

    const summary: CheckoutSummary = {
      cartId: cartData.cart.id,
      stores: storeSummaries,
      overallSubtotal,
      overallShippingCost,
      overallDiscount: this.add(overallDiscount, couponDiscount),
      finalPayableAmount,
      currency: this.DEFAULT_CURRENCY,
      totalItemCount: items.length,
      totalStoreCount: storeSummaries.length,
      warnings: allWarnings,
      couponCode,
      couponDiscount,
    };

    return { summary, storeSummaries, itemSummaries };
  }

  private isAvailable(storeProduct: StoreProduct): boolean {
    return (
      storeProduct.isActive &&
      storeProduct.status === 'ACTIVE' &&
      storeProduct.availabilityStatus === 'AVAILABLE' &&
      storeProduct.deletedAt === null &&
      (storeProduct.stockQuantity === null || storeProduct.stockQuantity > 0)
    );
  }

  private generatePriceChangeWarnings(
    itemSummaries: CheckoutItemSummary[],
    cartData: ValidatedCartData,
  ): CheckoutWarning[] {
    const warnings: CheckoutWarning[] = [];

    for (const itemSummary of itemSummaries) {
      const cartItem = cartData.items.find((i) => i.id === itemSummary.cartItemId);
      if (!cartItem) continue;

      const storeProduct = cartData.storeProducts.get(itemSummary.storeProductId);
      const price = cartData.prices.get(itemSummary.storeProductId);

      if (storeProduct && price) {
        if (storeProduct.availabilityStatus !== 'AVAILABLE') {
          warnings.push({
            type: 'AVAILABILITY_CHANGE',
            message: `Product availability changed to ${storeProduct.availabilityStatus}`,
            storeId: storeProduct.storeId,
            storeProductId: storeProduct.id,
            cartItemId: cartItem.id,
          });
        }
      }
    }

    return warnings;
  }

  private calculateCouponDiscount(couponCode: string, subtotal: string): string {
    // TODO: Implement coupon validation and discount calculation
    // This is a placeholder for future discount module integration
    return '0';
  }

  private add(a: string, b: string): string {
    const numA = this.parseDecimal(a);
    const numB = this.parseDecimal(b);
    return (numA + numB).toFixed(this.DECIMAL_PRECISION);
  }

  private subtract(a: string, b: string): string {
    const numA = this.parseDecimal(a);
    const numB = this.parseDecimal(b);
    const result = numA - numB;
    return result < 0 ? '0' : result.toFixed(this.DECIMAL_PRECISION);
  }

  private multiply(a: string, b: number): string {
    const numA = this.parseDecimal(a);
    return (numA * b).toFixed(this.DECIMAL_PRECISION);
  }

  private parseDecimal(value: string): number {
    return parseFloat(value) || 0;
  }
}