import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsOptional, ValidateNested, IsArray, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ShippingSelectionDto } from './shipping-selection.dto';

export class CheckoutPreviewDto {
  @ApiProperty({
    pattern: '^[A-Za-z0-9_-]{8}$',
    description: 'شناسه آدرس ارسال',
    example: 'addr1234',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  shippingAddressId!: string;

  @ApiProperty({
    type: [ShippingSelectionDto],
    description: 'انتخاب روش ارسال برای هر فروشگاه',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ShippingSelectionDto)
  shippingSelections!: ShippingSelectionDto[];

  @ApiPropertyOptional({
    description: 'کد تخفیف (اختیاری)',
    example: 'WELCOME10',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  couponCode?: string;
}