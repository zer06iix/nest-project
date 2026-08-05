import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { Role } from "../../common/enums/role.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiPropertyOptional({
        description: "نام نمایشی",
        example: "کوروش"
    })
    @IsString({ message: 'نام نمایشی باید یک رشته باشد' })
    @IsOptional()
    displayName?: string;

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
