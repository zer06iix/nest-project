import { IsNotEmpty, IsString, MinLength, MaxLength, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsIranPhoneNumber, NormalizeIranPhone } from '../../common/validators/phone.validator';
import { isEmptyDemoLogin } from '../../common/utils/demo-login';

export class LoginDto {
    @ApiProperty({
        description: 'شماره تماس',
        example: '09120000000',
    })
    @Transform(({ value }: { value: unknown }) => {
        if (typeof value === 'string') return value.trim();
        return value;
    })
    @ValidateIf((dto: LoginDto) => !isEmptyDemoLogin(dto))
    @IsString({ message: 'شماره موبایل باید یک رشته باشد' })
    @IsNotEmpty({ message: 'شماره موبایل نمیتواند خالی باشد' })
    @IsIranPhoneNumber({
        message: 'شماره موبایل معتبر نیست (فرمت: 09xxxxxxxxx یا +989xxxxxxxxx)',
    })
    @NormalizeIranPhone()
    phoneNumber!: string;

    @ApiProperty({
        description: 'رمز عبور(حداقل 6 رقم)',
        example: 'example123',
    })
    @Transform(({ value }: { value: unknown }) => {
        if (typeof value === 'string') return value.trim();
        return value;
    })
    @ValidateIf((dto: LoginDto) => !isEmptyDemoLogin(dto))
    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
    @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' })
    @MaxLength(20, { message: 'رمز عبور باید حداکثر 20 کاراکتر داشته باشد' })
    password!: string;
}
