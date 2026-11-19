import { Transform } from 'class-transformer';
import { IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStoreProductPriceDto {
    @ApiProperty({ minimum: 0 })
    @Transform(({ value }) => String(value))
    @IsString()
    @Matches(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, { message: 'amount must be a positive decimal' })
    amount!: string;

    @ApiPropertyOptional({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER })
    @IsOptional()
    @Transform(({ value }) => value === null ? value : String(value))
    @IsString()
    @Matches(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, { message: 'originalAmount must be a decimal' })
    originalAmount?: string | null;

    @ApiPropertyOptional({ minLength: 3, maxLength: 3, example: 'IRR' })
    @IsOptional()
    @IsString()
    @Matches(/^[A-Z]{3}$/)
    currency?: string;
}
