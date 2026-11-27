import { IsBoolean, IsInt, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductImageDto {
	@ApiProperty({ maxLength: 2048 })
	@IsString()
	@IsUrl({ protocols: ['http', 'https'], require_protocol: true })
	@MaxLength(2048)
	url!: string;

	@ApiPropertyOptional({ maxLength: 255 })
	@IsOptional()
	@IsString()
	@MaxLength(255)
	altText?: string | null;

	@ApiPropertyOptional({ default: false })
	@IsOptional()
	@IsBoolean()
	isPrimary?: boolean;

	@ApiPropertyOptional({ minimum: 0 })
	@IsOptional()
	@IsInt()
	@Min(0)
	sortOrder?: number;
}
