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

export class CreateUserDto {
    @IsString({ message: 'شماره موبایل باید یک رشته باشد' })
    @Matches(/^.{11}$/, { message: 'شماره موبایل باید 11 رقم باشد' })
    @IsNotEmpty({ message: 'شماره موبایل نمیتواند خالی باشد' })
    @Transform(({ value }) => value.trim())
    phoneNumber: string;

    @IsString({ message: 'نام نمایشی باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نمایشی نباید خالی باشد' })
    displayName: string;

    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @IsOptional()
    @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' })
    @MaxLength(20, { message: 'رمز عبور باید حداکثر 20 کاراکتر داشته باشد' })
    password?: string;

    @IsEnum(Role, {
        message: 'نقش کاربر باید یکی از این مقادیر باشد: (user, admin)',
    })
    @IsOptional()
    role?: Role;
}
