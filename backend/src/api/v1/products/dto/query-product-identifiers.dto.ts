import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductIdentifierType } from '../enums/product-identifier-type.enum';

export class QueryProductIdentifiersDto {
    @ApiPropertyOptional({ enum: ProductIdentifierType })
    @IsOptional()
    @IsEnum(ProductIdentifierType)
    type?: ProductIdentifierType;
}
