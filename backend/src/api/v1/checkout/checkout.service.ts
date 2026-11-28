import { Injectable } from '@nestjs/common';
import { CheckoutValidationService, ValidatedCartData, ValidatedShippingData } from './services/checkout-validation.service';
import { CheckoutPricingService, PricingResult } from './services/checkout-pricing.service';
import { CheckoutPreviewDto } from './dto/checkout-preview.dto';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CheckoutPreviewResponseDto } from './dto/checkout-response.dto';
import { CheckoutSummary, ValidatedCheckoutData, ShippingAddressData } from './interfaces/checkout-summary.interface';
import { InvalidCouponException, CheckoutValidationException } from './exceptions/checkout.exceptions';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly validationService: CheckoutValidationService,
    private readonly pricingService: CheckoutPricingService,
  ) {}

  async preview(
    userId: string | undefined,
    sessionId: string | undefined,
    dto: CheckoutPreviewDto,
  ): Promise<CheckoutPreviewResponseDto> {
    const cartData = await this.validationService.validateCart(userId, sessionId);
    const address = await this.validationService.validateShippingAddress(dto.shippingAddressId, userId ?? null);
    const shippingMethods = await this.validationService.validateShippingSelections(
      Array.from(cartData.stores.keys()),
      dto.shippingSelections,
    );

    const shippingData: ValidatedShippingData = {
      address,
      shippingMethods,
      shippingSelections: dto.shippingSelections,
    };

    const { summary } = this.pricingService.calculate(cartData, shippingData, dto.couponCode ?? null);

    return this.mapToResponseDto(summary, address, dto.shippingSelections, dto.couponCode ?? null);
  }

  async prepareCheckout(
    userId: string | undefined,
    sessionId: string | undefined,
    dto: CreateCheckoutDto,
  ): Promise<ValidatedCheckoutData> {
    const cartData = await this.validationService.validateCart(userId, sessionId);
    const address = await this.validationService.validateShippingAddress(dto.shippingAddressId, userId ?? null);
    const shippingMethods = await this.validationService.validateShippingSelections(
      Array.from(cartData.stores.keys()),
      dto.shippingSelections,
    );

    const shippingData: ValidatedShippingData = {
      address,
      shippingMethods,
      shippingSelections: dto.shippingSelections,
    };

    const { summary } = this.pricingService.calculate(cartData, shippingData, dto.couponCode ?? null);

    const allErrors = summary.warnings
      .filter((w) => w.type === 'STORE_UNAVAILABLE' || w.type === 'SHIPPING_UNAVAILABLE')
      .map((w) => w.message);

    if (allErrors.length > 0) {
      throw new CheckoutValidationException(allErrors);
    }

    const shippingAddressData: ShippingAddressData = {
      id: address.id,
      province: address.province,
      city: address.city,
      address: address.address,
      postalCode: address.postalCode,
      receiverMobile: address.receiverMobile,
      description: address.description,
    };

    return {
      summary,
      shippingAddress: shippingAddressData,
      shippingSelections: dto.shippingSelections,
      cartId: cartData.cart.id,
      userId: cartData.cart.userId ?? null,
      sessionId: cartData.cart.sessionId ?? null,
      expiresAt: cartData.cart.expiresAt,
    };
  }

  private mapToResponseDto(
    summary: CheckoutSummary,
    address: { id: string },
    shippingSelections: Array<{ storeId: string; shippingMethodId: string }>,
    couponCode: string | null,
  ): CheckoutPreviewResponseDto {
    return {
      cartId: summary.cartId,
      stores: summary.stores.map((store) => ({
        storeId: store.storeId,
        storeName: store.storeName,
        storeSlug: store.storeSlug,
        storeLogo: store.storeLogo,
        items: store.items.map((item) => ({
          cartItemId: item.cartItemId,
          storeProductId: item.storeProductId,
          storeId: item.storeId,
          storeName: item.storeName,
          storeSlug: item.storeSlug,
          productId: item.productId,
          productName: item.productName,
          productSlug: item.productSlug,
          variantId: item.variantId,
          variantTitle: item.variantTitle,
          variantSku: item.variantSku,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          originalUnitPrice: item.originalUnitPrice,
          currency: item.currency,
          itemTotal: item.itemTotal,
          availabilityStatus: item.availabilityStatus,
          stockStatus: item.stockStatus,
          stockQuantity: item.stockQuantity,
          isAvailable: item.isAvailable,
          priceChanged: item.priceChanged,
          availabilityChanged: item.availabilityChanged,
          storeProductTitle: item.storeProductTitle,
          storeProductDescription: item.storeProductDescription,
        })),
        subtotal: store.subtotal,
        shippingCost: store.shippingCost,
        discount: store.discount,
        total: store.total,
        currency: store.currency,
        itemCount: store.itemCount,
        shippingSelection: store.shippingSelection
          ? {
              storeId: store.shippingSelection.storeId,
              shippingMethodId: store.shippingSelection.shippingMethodId,
              shippingMethodName: store.shippingSelection.shippingMethodName,
              shippingCost: store.shippingSelection.shippingCost,
              estimatedDeliveryDays: store.shippingSelection.estimatedDeliveryDays,
            }
          : null,
      })),
      overallSubtotal: summary.overallSubtotal,
      overallShippingCost: summary.overallShippingCost,
      overallDiscount: summary.overallDiscount,
      finalPayableAmount: summary.finalPayableAmount,
      currency: summary.currency,
      totalItemCount: summary.totalItemCount,
      totalStoreCount: summary.totalStoreCount,
      warnings: summary.warnings.map((w) => ({
        type: w.type,
        message: w.message,
        storeId: w.storeId,
        storeProductId: w.storeProductId,
        cartItemId: w.cartItemId,
      })),
      couponCode: summary.couponCode,
      couponDiscount: summary.couponDiscount,
    };
  }
}