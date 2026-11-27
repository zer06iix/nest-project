import { Transform } from 'class-transformer';
import { IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStoreProductPriceDto {
	@ApiProperty({ minimum: 0 })
	@Transform(({ value }: { value: unknown }) => {
		if (value === null || value === undefined) return value;
		if (typeof value === 'number') return value.toString();
		if (typeof value === 'string') return value;
		return JSON.stringify(value);
	})
	@IsString()
	@Matches(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, {
		message: 'amount must be a positive decimal',
	})
	amount!: string;

	@ApiPropertyOptional({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER })
	@IsOptional()
	@Transform(({ value }: { value: unknown }) => {
		if (value === null || value === undefined) return value;
		if (typeof value === 'number') return value.toString();
		if (typeof value === 'string') return value;
		return JSON.stringify(value);
	})
	@IsString()
	@Matches(/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/, {
		message: 'originalAmount must be a decimal',
	})
	originalAmount?: string | null;

	@ApiPropertyOptional({ minLength: 3, maxLength: 3, example: 'IRR' })
	@IsOptional()
	@IsString()
	@Matches(/^[A-Z]{3}$/)
	currency?: string;
}
