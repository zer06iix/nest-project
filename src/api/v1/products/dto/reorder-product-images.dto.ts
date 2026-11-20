import { Type } from 'class-transformer';
import {
    IsArray,
    IsInt,
    IsString,
    Matches,
    Min,
    ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';

class ProductImageOrderDto {
    @ApiProperty({ pattern: ENTITY_ID_PATTERN.source })
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    imageId!: string;

    @ApiProperty({ minimum: 0 })
    @IsInt()
    @Min(0)
    sortOrder!: number;
}

export class ReorderProductImagesDto {
    @ApiProperty({ type: [ProductImageOrderDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageOrderDto)
    images!: ProductImageOrderDto[];
}
