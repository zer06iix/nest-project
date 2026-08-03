import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { Roles } from "../../common/enums/role.enum";

export class UpdateUserDto {
    @IsString({ message: 'نام نمایشی باید یک رشته باشد' })
    @IsNotEmpty({ message: 'نام نمایشی نباید خالی باشد' })
    displayName: string;

    @IsEnum(Roles, {
        message: 'نقش کاربر باید یکی از این مقادیر باشد: (user, admin)',
    })
    @IsOptional()
    role?: Roles;
}
