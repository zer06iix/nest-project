import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';
import { ENTITY_ID_PATTERN } from '../../common/utils/entity-id';

export class CreateCartDto {
    @ApiPropertyOptional({
        pattern: ENTITY_ID_PATTERN.source,
        description: 'شناسه کاربر (اختیاری، پیش‌فرض: کاربر احراز هویت شده)',
    })
    @IsOptional()
    @IsString()
    @Matches(ENTITY_ID_PATTERN)
    userId?: string;

    @ApiPropertyOptional({ description: 'شناسه نشست برای کاربران مهمان (اختیاری)' })
    @IsOptional()
    @IsString()
    sessionId?: string;
}