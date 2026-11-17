import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Matches, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStoreProductPriceDto {
    @ApiProperty({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER })
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    @Max(Number.MAX_SAFE_INTEGER)
    amount!: number;

    @ApiPropertyOptional({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER })
    @IsOptional()
    @Transform(({ value }) => value === null ? value : Number(value))
    @IsInt()
    @Min(0)
    @Max(Number.MAX_SAFE_INTEGER)
    originalAmount?: number | null;

    @ApiPropertyOptional({ minLength: 3, maxLength: 3, example: 'IRR' })
    @IsOptional()
    @IsString()
    @Matches(/^[A-Z]{3}$/)
    currency?: string;
}
