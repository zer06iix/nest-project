import { Transform } from 'class-transformer';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductIdentifierType } from '../enums/product-identifier-type.enum';

export class CreateProductIdentifierDto {
    @ApiProperty({ enum: ProductIdentifierType })
    @IsEnum(ProductIdentifierType)
    type!: ProductIdentifierType;

    @ApiProperty({ maxLength: 100 })
    @Transform(({ value }: { value: unknown }) =>
        typeof value === 'string' ? value.trim().toUpperCase() : value,
    )
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    value!: string;
}
