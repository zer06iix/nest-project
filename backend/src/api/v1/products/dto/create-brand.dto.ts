import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsOptional,
	IsString,
	IsUrl,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto {
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

	@ApiPropertyOptional({ maxLength: 500 })
	@IsOptional()
	@IsUrl({ require_protocol: true })
	@MaxLength(500)
	logo?: string | null;

	@ApiPropertyOptional({ description: 'توضیحات برند' })
	@IsOptional()
	@IsString()
	description?: string | null;

	@ApiPropertyOptional({ description: 'فعال یا غیرفعال بودن برند' })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}
