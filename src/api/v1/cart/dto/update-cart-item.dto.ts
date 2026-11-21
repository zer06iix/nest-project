import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartItemDto {
    @ApiProperty({ minimum: 1, description: 'تعداد جدید آیتم' })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    quantity!: number;
}