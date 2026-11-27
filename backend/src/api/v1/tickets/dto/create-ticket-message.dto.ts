import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTicketMessageDto {
	@ApiProperty({
		description: 'متن پیام',
		example: '',
	})
	@IsString({ message: 'متن پیام باید یک رشته باشد' })
	@IsNotEmpty({ message: 'متن پیام نباید خالی باشد' })
	@MaxLength(10000)
	body!: string;
}
