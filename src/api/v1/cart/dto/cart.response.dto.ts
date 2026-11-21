import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CartItemResponseDto } from './cart-item.response.dto';
import { CartStatus } from '../enums/cart-status.enum';
import { User } from '../../users/entities/user.entity';

export class CartResponseDto {
    @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه سبد خرید' })
    @Expose()
    id!: string;

    @ApiProperty({ pattern: '^[A-Za-z0-9_-]{8}$', description: 'شناسه کاربر' })
    @Expose()
    userId!: string;

    @ApiProperty({ enum: CartStatus, description: 'وضعیت سبد خرید' })
    @Expose()
    status!: CartStatus;

    @ApiProperty({ description: 'تاریخ انقضا' })
    @Expose()
    expiresAt!: Date;

    @ApiProperty({ type: [CartItemResponseDto], description: 'آیتم‌های سبد خرید' })
    @Expose()
    @Type(() => CartItemResponseDto)
    items!: CartItemResponseDto[];

    @ApiProperty({ type: () => User, description: 'کاربر' })
    @Expose()
    @Type(() => User)
    user!: User;

    @ApiProperty({ description: 'تاریخ ایجاد' })
    @Expose()
    createdAt!: Date;

    @ApiProperty({ description: 'تاریخ به‌روزرسانی' })
    @Expose()
    updatedAt!: Date;

    @ApiProperty({ description: 'تعداد کل آیتم‌ها در سبد خرید' })
    @Expose()
    get totalItems(): number {
        return this.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    }

    @ApiProperty({ description: 'مبلغ کل تمام آیتم‌های سبد خرید' })
    @Expose()
    get totalPrice(): number {
        return this.items?.reduce((sum, item) => sum + item.lineTotal, 0) || 0;
    }
}