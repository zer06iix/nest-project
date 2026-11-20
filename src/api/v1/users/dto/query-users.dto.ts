import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';

export class QueryUsersDto {
    @ApiPropertyOptional({ minimum: 1, default: 1 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    page = 1;

    @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 20 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    @Max(100)
    limit = 20;

    @ApiPropertyOptional({ enum: Role })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}
