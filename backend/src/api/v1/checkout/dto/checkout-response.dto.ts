import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ShippingSelectionDto } from './shipping-selection.dto';

export class CheckoutItemResponseDto {
  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه آیتم سبد خرید' })
  @Expose()
  cartItemId!: string;

  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه محصول فروشگاه' })
  @Expose()
  storeProductId!: string;

  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه فروشگاه' })
  @Expose()
  storeId!: string;

  @ApiProperty({ description: 'نام فروشگاه' })
  @Expose()
  storeName!: string;

  @ApiProperty({ description: 'اسلاگ فروشگاه' })
  @Expose()
  storeSlug!: string;

  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه محصول' })
  @Expose()
  productId!: string;

  @ApiProperty({ description: 'نام محصول' })
  @Expose()
  productName!: string;

  @ApiProperty({ description: 'اسلاگ محصول' })
  @Expose()
  productSlug!: string;

  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه تنوع محصول' })
  @Expose()
  variantId!: string;

  @ApiProperty({ description: 'عنوان تنوع' })
  @Expose()
  variantTitle!: string;

  @ApiPropertyOptional({ description: 'SKU تنوع', nullable: true })
  @Expose()
  variantSku!: string | null;

  @ApiProperty({ description: 'تعداد', minimum: 1 })
  @Expose()
  quantity!: number;

  @ApiProperty({ description: 'قیمت واحد فعلی', example: '50000.000000' })
  @Expose()
  unitPrice!: string;

  @ApiPropertyOptional({ description: 'قیمت واحد اصلی (قبل از تخفیف)', example: '60000.000000', nullable: true })
  @Expose()
  originalUnitPrice!: string | null;

  @ApiProperty({ description: 'واحد پول', example: 'IRR' })
  @Expose()
  currency!: string;

  @ApiProperty({ description: 'مبلغ کل آیتم (تعداد × قیمت واحد)', example: '150000.000000' })
  @Expose()
  itemTotal!: string;

  @ApiProperty({ description: 'وضعیت موجودی', enum: ['AVAILABLE', 'OUT_OF_STOCK', 'PRE_ORDER', 'DISCONTINUED'] })
  @Expose()
  availabilityStatus!: string;

  @ApiProperty({ description: 'وضعیت انبار', enum: ['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'UNKNOWN'] })
  @Expose()
  stockStatus!: string;

  @ApiPropertyOptional({ description: 'موجودی انبار', minimum: 0, nullable: true })
  @Expose()
  stockQuantity!: number | null;

  @ApiProperty({ description: 'آیا آیتم برای خرید موجود است' })
  @Expose()
  isAvailable!: boolean;

  @ApiProperty({ description: 'آیا قیمت از زمان افزودن به سبد تغییر کرده' })
  @Expose()
  priceChanged!: boolean;

  @ApiProperty({ description: 'آیا موجودی از زمان افزودن به سبد تغییر کرده' })
  @Expose()
  availabilityChanged!: boolean;

  @ApiPropertyOptional({ description: 'عنوان سفارشی محصول در فروشگاه', nullable: true })
  @Expose()
  storeProductTitle!: string | null;

  @ApiPropertyOptional({ description: 'توضیحات سفارشی محصول در فروشگاه', nullable: true })
  @Expose()
  storeProductDescription!: string | null;
}

export class StoreShippingSelectionResponseDto {
  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه فروشگاه' })
  @Expose()
  storeId!: string;

  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه روش ارسال' })
  @Expose()
  shippingMethodId!: string;

  @ApiProperty({ description: 'نام روش ارسال' })
  @Expose()
  shippingMethodName!: string;

  @ApiProperty({ description: 'هزینه ارسال', example: '25000.000000' })
  @Expose()
  shippingCost!: string;

  @ApiPropertyOptional({ description: 'روزهای تخمینی تحویل', minimum: 0, nullable: true })
  @Expose()
  estimatedDeliveryDays!: number | null;
}

export class StoreCheckoutResponseDto {
  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه فروشگاه' })
  @Expose()
  storeId!: string;

  @ApiProperty({ description: 'نام فروشگاه' })
  @Expose()
  storeName!: string;

  @ApiProperty({ description: 'اسلاگ فروشگاه' })
  @Expose()
  storeSlug!: string;

  @ApiPropertyOptional({ description: 'لوگو فروشگاه', nullable: true })
  @Expose()
  storeLogo!: string | null;

  @ApiProperty({ type: [CheckoutItemResponseDto], description: 'آیتم‌های این فروشگاه' })
  @Expose()
  @Type(() => CheckoutItemResponseDto)
  items!: CheckoutItemResponseDto[];

  @ApiProperty({ description: 'جمع فرعی فروشگاه (مجموع آیتم‌ها)', example: '150000.000000' })
  @Expose()
  subtotal!: string;

  @ApiProperty({ description: 'هزینه ارسال فروشگاه', example: '25000.000000' })
  @Expose()
  shippingCost!: string;

  @ApiProperty({ description: 'مبلغ تخفیف فروشگاه', example: '0.000000' })
  @Expose()
  discount!: string;

  @ApiProperty({ description: 'مجموع فروشگاه (جمع فرعی + ارسال - تخفیف)', example: '175000.000000' })
  @Expose()
  total!: string;

  @ApiProperty({ description: 'واحد پول', example: 'IRR' })
  @Expose()
  currency!: string;

  @ApiProperty({ description: 'تعداد آیتم‌ها در این فروشگاه', minimum: 1 })
  @Expose()
  itemCount!: number;

  @ApiProperty({ type: StoreShippingSelectionResponseDto, description: 'روش ارسال انتخاب شده برای این فروشگاه', nullable: true })
  @Expose()
  @Type(() => StoreShippingSelectionResponseDto)
  shippingSelection!: StoreShippingSelectionResponseDto | null;
}

export class CheckoutWarningResponseDto {
  @ApiProperty({ description: 'نوع هشدار', enum: ['PRICE_CHANGE', 'AVAILABILITY_CHANGE', 'LOW_STOCK', 'STORE_UNAVAILABLE', 'SHIPPING_UNAVAILABLE'] })
  @Expose()
  type!: 'PRICE_CHANGE' | 'AVAILABILITY_CHANGE' | 'LOW_STOCK' | 'STORE_UNAVAILABLE' | 'SHIPPING_UNAVAILABLE';

  @ApiProperty({ description: 'پیام هشدار' })
  @Expose()
  message!: string;

  @ApiPropertyOptional({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه فروشگاه مرتبط' })
  @Expose()
  storeId?: string;

  @ApiPropertyOptional({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه محصول فروشگاه مرتبط' })
  @Expose()
  storeProductId?: string;

  @ApiPropertyOptional({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه آیتم سبد خرید مرتبط' })
  @Expose()
  cartItemId?: string;
}

export class CheckoutPreviewResponseDto {
  @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه سبد خرید' })
  @Expose()
  cartId!: string;

  @ApiProperty({ type: [StoreCheckoutResponseDto], description: 'فروشگاه‌ها با آیتم‌ها و جمع‌ها' })
  @Expose()
  @Type(() => StoreCheckoutResponseDto)
  stores!: StoreCheckoutResponseDto[];

  @ApiProperty({ description: 'جمع فرعی کلی (مجموع جمع‌های فرعی فروشگاه‌ها)', example: '300000.000000' })
  @Expose()
  overallSubtotal!: string;

  @ApiProperty({ description: 'هزینه ارسال کلی (مجموع هزینه‌های ارسال فروشگاه‌ها)', example: '50000.000000' })
  @Expose()
  overallShippingCost!: string;

  @ApiProperty({ description: 'تخفیف کلی (مجموع تخفیف‌های فروشگاه‌ها + کپن)', example: '15000.000000' })
  @Expose()
  overallDiscount!: string;

  @ApiProperty({ description: 'مبلغ نهایی قابل پرداخت (جمع فرعی + ارسال - تخفیف)', example: '335000.000000' })
  @Expose()
  finalPayableAmount!: string;

  @ApiProperty({ description: 'واحد پول', example: 'IRR' })
  @Expose()
  currency!: string;

  @ApiProperty({ description: 'تعداد کل آیتم‌ها در تمام فروشگاه‌ها', minimum: 1 })
  @Expose()
  totalItemCount!: number;

  @ApiProperty({ description: 'تعداد فروشگاه‌ها در سبد', minimum: 1 })
  @Expose()
  totalStoreCount!: number;

  @ApiProperty({ type: [CheckoutWarningResponseDto], description: 'هشدارهای تغییر قیمت/موجودی' })
  @Expose()
  @Type(() => CheckoutWarningResponseDto)
  warnings!: CheckoutWarningResponseDto[];

  @ApiPropertyOptional({ description: 'کد کپن اعمال شده', nullable: true })
  @Expose()
  couponCode!: string | null;

  @ApiProperty({ description: 'مبلغ تخفیف کپن', example: '10000.000000' })
  @Expose()
  couponDiscount!: string;
}