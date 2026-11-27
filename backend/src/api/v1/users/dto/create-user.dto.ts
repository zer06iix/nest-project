import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '../../common/enums/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIranPhoneNumber, NormalizeIranPhone } from '../../common/validators/phone.validator';

export class CreateUserDto {
	@ApiProperty({
		description: 'شماره تماس',
		example: '09124678266',
	})
	@IsString({ message: 'شماره موبایل باید یک رشته باشد' })
	@IsNotEmpty({ message: 'شماره موبایل نمیتواند خالی باشد' })
	@IsIranPhoneNumber({
		message: 'شماره موبایل معتبر نیست (فرمت: 09xxxxxxxxx یا +989xxxxxxxxx)',
	})
	@NormalizeIranPhone()
	@Transform(({ value }: { value: unknown }) => {
		if (typeof value === 'string') return value.trim();
		return value;
	})
	phoneNumber!: string;

	@ApiProperty({
		description: 'نام نمایشی',
		example: 'علی',
	})
	@IsString({ message: 'نام نمایشی باید یک رشته باشد' })
	@IsNotEmpty({ message: 'نام نمایشی نباید خالی باشد' })
	displayName!: string;

	@ApiPropertyOptional({
		description: 'رمز عبور(حداقل 6 رقم)',
		example: '123456',
	})
	@IsString({ message: 'رمز عبور باید یک رشته باشد' })
	@IsOptional()
	@MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' })
	@MaxLength(20, { message: 'رمز عبور باید حداکثر 20 کاراکتر داشته باشد' })
	password?: string;

	@ApiPropertyOptional({
		description: 'مقام کاربر',
		enum: Role,
	})
	@IsEnum(Role, {
		message: 'نقش کاربر باید یکی از این مقادیر باشد: (user, admin)',
	})
	@IsOptional()
	role?: Role;
}
