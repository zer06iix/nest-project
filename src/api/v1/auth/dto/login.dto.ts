import {
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    MaxLength
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
    @ApiProperty({
        description: "شماره تماس",
        example: "09124678266"
    })
    @IsString({ message: 'شماره موبایل باید یک رشته باشد' })
    @Matches(/^.{11}$/, { message: 'شماره موبایل باید 11 رقم باشد' })
    @IsNotEmpty({ message: 'شماره موبایل نمیتواند خالی باشد' })
    @Transform(({ value }) => value.trim())
    phoneNumber: string;
    
    @ApiProperty({
        description: "رمز عبور(حداقل 6 رقم)",
        example: "123456"
    })
    @IsString({ message: 'رمز عبور باید یک رشته باشد' })
    @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
    @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' })
    @MaxLength(20, { message: 'رمز عبور باید حداکثر 20 کاراکتر داشته باشد' })
    password: string;
}