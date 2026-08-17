import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '../../common/enums/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: "شماره تماس 11 رقمی",
        example: "09124678266"
    })
    @IsString({ message: 'شماره موبایل باید یک رشته باشد' })
    @Matches(/^.{11}$/, { message: 'شماره موبایل باید 11 رقم باشد' })
    @IsNotEmpty({ message: 'شماره موبایل نمیتواند خالی باشد' })
    @Transform(({ value }) => value.trim())
    phoneNumber!: string;

    @ApiProperty({
        description: "نام نمایشی",
        example: "علی"
    })
    @IsString({ message: 'نام نمایشی باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نمایشی نباید خالی باشد' })
    displayName!: string;

    @ApiPropertyOptional({
        description: "رمز عبور(حداقل 6 رقم)",
        example: "123456"
    })
    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @IsOptional()
    @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' })
    @MaxLength(20, { message: 'رمز عبور باید حداکثر 20 کاراکتر داشته باشد' })
    password?: string;

    @ApiPropertyOptional({
        description: "مقام کاربر",
        enum: Role
    })
    @IsEnum(Role, {
        message: 'نقش کاربر باید یکی از این مقادیر باشد: (user, admin)',
    })
    @IsOptional()
    role?: Role;
}
