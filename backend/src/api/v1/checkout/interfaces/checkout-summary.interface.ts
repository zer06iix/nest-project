export interface CheckoutItemSummary {
  cartItemId: string;
  storeProductId: string;
  storeId: string;
  storeName: string;
  storeSlug: string;
  productId: string;
  productName: string;
  productSlug: string;
  variantId: string;
  variantTitle: string;
  variantSku: string | null;
  quantity: number;
  unitPrice: string;
  originalUnitPrice: string | null;
  currency: string;
  itemTotal: string;
  availabilityStatus: string;
  stockStatus: string;
  stockQuantity: number | null;
  isAvailable: boolean;
  priceChanged: boolean;
  availabilityChanged: boolean;
  storeProductTitle: string | null;
  storeProductDescription: string | null;
}

export interface StoreShippingSelection {
  storeId: string;
  shippingMethodId: string;
  shippingMethodName: string;
  shippingCost: string;
  estimatedDeliveryDays: number | null;
}

export interface StoreCheckoutSummary {
  storeId: string;
  storeName: string;
  storeSlug: string;
  storeLogo: string | null;
  items: CheckoutItemSummary[];
  subtotal: string;
  shippingCost: string;
  discount: string;
  total: string;
  currency: string;
  itemCount: number;
  shippingSelection: StoreShippingSelection | null;
}

export interface CheckoutSummary {
  cartId: string;
  stores: StoreCheckoutSummary[];
  overallSubtotal: string;
  overallShippingCost: string;
  overallDiscount: string;
  finalPayableAmount: string;
  currency: string;
  totalItemCount: number;
  totalStoreCount: number;
  warnings: CheckoutWarning[];
  couponCode: string | null;
  couponDiscount: string;
}

export interface CheckoutWarning {
  type: 'PRICE_CHANGE' | 'AVAILABILITY_CHANGE' | 'LOW_STOCK' | 'STORE_UNAVAILABLE' | 'SHIPPING_UNAVAILABLE';
  message: string;
  storeId?: string;
  storeProductId?: string;
  cartItemId?: string;
}

export interface ValidatedCheckoutData {
  summary: CheckoutSummary;
  shippingAddress: ShippingAddressData;
  shippingSelections: Array<{ storeId: string; shippingMethodId: string }>;
  cartId: string;
  userId: string | null;
  sessionId: string | null;
  expiresAt: Date;
}

export interface ShippingAddressData {
  id: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiverMobile: string;
  description: string | null;
}

export interface ShippingMethodData {
  id: string;
  storeId: string;
  name: string;
  description: string | null;
  cost: string;
  currency: string;
  estimatedDeliveryDays: number | null;
  isActive: boolean;
  minOrderAmount: string | null;
  maxOrderAmount: string | null;
  conditions: Record<string, unknown> | null;
}