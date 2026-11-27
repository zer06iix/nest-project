import { Type } from 'class-transformer';
import { ArrayUnique, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttributeValueDto } from './attribute-value.dto';

export class SetAttributeValuesDto {
	@ApiProperty({ type: [AttributeValueDto] })
	@IsArray()
	@ArrayUnique((value: AttributeValueDto) => value.attributeId)
	@ValidateNested({ each: true })
	@Type(() => AttributeValueDto)
	values!: AttributeValueDto[];
}
