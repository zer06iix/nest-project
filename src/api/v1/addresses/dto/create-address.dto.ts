import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsString,
    IsOptional,
    IsNotEmpty,
    Matches,
    Length
} from "class-validator";


export class CreateAddressDto {
    @ApiProperty({
        description: "استان",
        example: "خراسان رضوی"
    })
    @IsString({ message: 'استان باید یک رشته باشد' })
    @IsNotEmpty({ message: 'استان نباید خالی باشد' })
    province!: string

    @ApiProperty({
        description: "شهر",
        example: "مشهد"
    })
    @IsString({ message: 'شهر باید یک رشته باشد' })
    @IsNotEmpty({ message: 'شهر نباید خالی باشد' })
    city!: string

    @ApiProperty({
        description: "ادرس",
        example: "خیابان هفت تیر"
    })
    @IsString({ message: 'ادرس باید یک رشته باشد' })
    @IsNotEmpty({ message: 'ادرس نباید خالی باشد' })
    address!: string

    @ApiProperty({
        description: "کد پستی",
        example: "5682971357"
    })
    @IsString({ message: 'کد پستی باید یک رشته باشد' })
    @Length(10, 10, { message: "کد پستی باید 10 رقم باشد" })
    @IsNotEmpty({ message: 'کد پستی نباید خالی باشد' })
    postalCode!: string

    @ApiProperty({
        description: "شماره تماس 11 رقمی",
        example: "09124678266"
    })
    @IsString({ message: 'شماره موبایل باید یک رشته باشد' })
    @Matches(/^.{11}$/, { message: 'شماره موبایل باید 11 رقم باشد' })
    @IsNotEmpty({ message: 'شماره موبایل نباید خالی باشد' })
    receiverMobile!: string

    @ApiPropertyOptional({
        description: "توضیحات",
        example: ""
    })
    @IsString({ message: 'توضیحات باید یک رشته باشد' })
    @IsOptional()
    description?: string
    
}