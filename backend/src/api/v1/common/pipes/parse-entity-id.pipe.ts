import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ENTITY_ID_PATTERN } from '../utils/entity-id';

@Injectable()
export class ParseEntityIdPipe implements PipeTransform<string, string> {
	transform(value: string): string {
		if (!ENTITY_ID_PATTERN.test(value)) {
			throw new BadRequestException('Invalid entity ID');
		}
		return value;
	}
}
