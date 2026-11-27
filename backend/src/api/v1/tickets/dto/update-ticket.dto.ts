import { IsEnum, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { TicketStatus } from '../enums/ticket-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';

export class UpdateTicketDto {
	@ApiProperty({
		description: 'وضعیت تیکت',
		example: 'درحال پیگیری',
	})
	@IsOptional()
	@IsEnum(TicketStatus)
	status?: TicketStatus;

	@ApiProperty({
		description: 'آیدی متقاضی تیکت',
		example: '3242342',
	})
	@IsOptional()
	@IsString()
	@MaxLength(36)
	@Matches(ENTITY_ID_PATTERN)
	assignedToId?: string;

	@ApiProperty({
		description: 'موضوع تیکت',
		example: 'مشکل در پرداخت',
	})
	@IsOptional()
	@IsString()
	subject?: string;

	@ApiProperty({
		description: 'توضیحات تیکت',
		example: '',
	})
	@IsOptional()
	@IsString()
	description?: string;
}
