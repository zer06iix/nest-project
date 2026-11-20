import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsIranPhoneNumber,
    NormalizeIranPhone,
} from '../../common/validators/phone.validator';

export class LoginDto {
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
        description: 'رمز عبور(حداقل 6 رقم)',
        example: '123456',
    })
    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
    @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' })
    @MaxLength(20, { message: 'رمز عبور باید حداکثر 20 کاراکتر داشته باشد' })
    password!: string;
}
