import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Roles } from '../enums/RoleEnum';

export class CreateUserDto {
    @IsString({ message: 'شماره موبایل باید یک رشته باشد' })
    @Matches(/^.{11}$/, { message: 'شماره موبایل باید 11 رقم باشد' })
    @IsNotEmpty({ message: 'شماره موبایل نمیتواند خالی باشد' })
    @Transform(({ value }) => value.trim())
    phone_number: string;

    @IsString({ message: 'نام نمایشی باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نمایشی نباید خالی باشد' })
    displayName: string;

    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @IsOptional()
    @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' })
    password?: string;

    @IsEnum(Roles, {
        message: 'نقش کاربر باید یکی از این مقادیر باشد: (user, admin)',
    })
    @IsOptional()
    role?: Roles;
}
