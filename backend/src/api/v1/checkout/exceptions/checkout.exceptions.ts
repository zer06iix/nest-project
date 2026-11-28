import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class CartNotFoundException extends NotFoundException {
  constructor(cartId?: string) {
    super(cartId ? `Active cart with ID ${cartId} not found` : 'Active cart not found');
  }
}

export class CartEmptyException extends BadRequestException {
  constructor() {
    super('Cart is empty. Add items before proceeding to checkout.');
  }
}

export class CartInactiveException extends BadRequestException {
  constructor() {
    super('Cart is not active. Please refresh or create a new cart.');
  }
}

export class InvalidCartItemException extends UnprocessableEntityException {
  constructor(message: string, public readonly itemId?: string) {
    super(message);
  }
}

export class StoreProductNotFoundException extends NotFoundException {
  constructor(storeProductId?: string) {
    super(
      storeProductId
        ? `Store product with ID ${storeProductId} not found`
        : 'Store product not found',
    );
  }
}

export class StoreProductUnavailableException extends UnprocessableEntityException {
  constructor(
    public readonly storeProductId: string,
    public readonly reason: string,
  ) {
    super(
      `Store product ${storeProductId} is unavailable: ${reason}`,
    );
  }
}

export class StoreInactiveException extends UnprocessableEntityException {
  constructor(public readonly storeId: string) {
    super(`Store ${storeId} is not active`);
  }
}

export class ProductVariantInactiveException extends UnprocessableEntityException {
  constructor(public readonly variantId: string) {
    super(`Product variant ${variantId} is not active`);
  }
}

export class InsufficientInventoryException extends UnprocessableEntityException {
  constructor(
    public readonly storeProductId: string,
    public readonly requestedQuantity: number,
    public readonly availableQuantity: number | null,
  ) {
    super(
      `Insufficient inventory for store product ${storeProductId}. Requested: ${requestedQuantity}, Available: ${availableQuantity ?? 'unknown'}`,
    );
  }
}

export class InvalidPriceException extends UnprocessableEntityException {
  constructor(public readonly storeProductId: string, message: string) {
    super(`Invalid price for store product ${storeProductId}: ${message}`);
  }
}

export class ShippingAddressNotFoundException extends NotFoundException {
  constructor(addressId?: string) {
    super(addressId ? `Shipping address with ID ${addressId} not found` : 'Shipping address not found');
  }
}

export class ShippingAddressOwnershipException extends UnprocessableEntityException {
  constructor(public readonly addressId: string) {
    super(`Shipping address ${addressId} does not belong to the current customer`);
  }
}

export class ShippingMethodNotFoundException extends NotFoundException {
  constructor(methodId?: string) {
    super(methodId ? `Shipping method with ID ${methodId} not found` : 'Shipping method not found');
  }
}

export class ShippingMethodUnavailableException extends UnprocessableEntityException {
  constructor(
    public readonly storeId: string,
    public readonly methodId: string,
    public readonly reason: string,
  ) {
    super(`Shipping method ${methodId} for store ${storeId} is unavailable: ${reason}`);
  }
}

export class MissingShippingSelectionException extends BadRequestException {
  constructor(public readonly storeId: string) {
    super(`Shipping method selection is required for store ${storeId}`);
  }
}

export class InvalidCouponException extends BadRequestException {
  constructor(code?: string, reason?: string) {
    super(code ? `Coupon ${code} is invalid: ${reason ?? 'Unknown reason'}` : 'Invalid coupon code');
  }
}

export class CheckoutValidationException extends UnprocessableEntityException {
  constructor(errors: string[]) {
    super(`Checkout validation failed: ${errors.join('; ')}`);
  }
}

export class OrderCreationNotImplementedException extends ConflictException {
  constructor() {
    super('Order creation is not implemented. This checkout prepares data for future order creation.');
  }
}

export class PriceMismatchException extends UnprocessableEntityException {
  constructor(
    public readonly storeProductId: string,
    public readonly expectedPrice: string,
    public readonly actualPrice: string,
  ) {
    super(
      `Price mismatch for store product ${storeProductId}. Expected: ${expectedPrice}, Actual: ${actualPrice}`,
    );
  }
}