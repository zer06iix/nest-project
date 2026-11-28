import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ShippingSelectionDto {
  @ApiProperty({
    pattern: '^[A-Za-z0-9_-]{8}$',
    description: 'شناسه فروشگاه',
    example: 'abc12345',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  storeId!: string;

  @ApiProperty({
    pattern: '^[A-Za-z0-9_-]{8}$',
    description: 'شناسه روش ارسال',
    example: 'def67890',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  shippingMethodId!: string;
}