import { Transform } from 'class-transformer';
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsUrl,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StoreStatus } from '../enums/store-status.enum';

export class CreateStoreDto {
	@ApiProperty({ maxLength: 255 })
	@Transform(({ value }: { value: unknown }) =>
		typeof value === 'string' ? value.trim() : value,
	)
	@IsString()
	@MinLength(1)
	@MaxLength(255)
	name!: string;

	@ApiProperty({ maxLength: 255 })
	@Transform(({ value }: { value: unknown }) =>
		typeof value === 'string' ? value.trim().toLowerCase() : value,
	)
	@IsString()
	@MinLength(1)
	@MaxLength(255)
	@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
	slug!: string;

	@ApiPropertyOptional({ description: 'توضیحات فروشگاه' })
	@IsOptional()
	@IsString()
	description?: string | null;

	@ApiPropertyOptional({ maxLength: 500 })
	@IsOptional()
	@IsUrl({ require_protocol: true })
	@MaxLength(500)
	logo?: string | null;

	@ApiPropertyOptional({ maxLength: 500 })
	@IsOptional()
	@IsUrl({ require_protocol: true })
	@MaxLength(500)
	website?: string | null;

	@ApiPropertyOptional({ maxLength: 255 })
	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string | null;

	@ApiPropertyOptional({ maxLength: 50 })
	@IsOptional()
	@IsString()
	@MaxLength(50)
	phone?: string | null;

	@ApiPropertyOptional({ enum: StoreStatus, default: StoreStatus.PENDING })
	@IsOptional()
	@IsEnum(StoreStatus)
	status?: StoreStatus;
}
