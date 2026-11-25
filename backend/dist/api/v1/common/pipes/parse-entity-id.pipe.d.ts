import { PipeTransform } from '@nestjs/common';
export declare class ParseEntityIdPipe implements PipeTransform<string, string> {
    transform(value: string): string;
}
