import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AttributesService } from '../services/attributes.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { CreateAttributeOptionDto } from '../dto/create-attribute-option.dto';
import { UpdateAttributeOptionDto } from '../dto/update-attribute-option.dto';
import { JwtAccessGuard } from '../../auth/guards/jwt-access.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '../../common/enums/role.enum';
import { ParseEntityIdPipe } from '../../common/pipes/parse-entity-id.pipe';

@ApiTags('ویژگی‌ها')
@Controller({ path: 'attributes', version: '1' })
export class AttributesController {
    constructor(private readonly attributesService: AttributesService) {}

    @Post()
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'ایجاد ویژگی (فقط مدیر)' })
    create(@Body() dto: CreateAttributeDto) {
        return this.attributesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'دریافت ویژگی‌های فعال' })
    findAll() {
        return this.attributesService.findAll();
    }

    @Get(':id/options')
    @ApiOperation({ summary: 'دریافت گزینه‌های فعال ویژگی' })
    findOptions(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.attributesService.findOptions(id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'دریافت ویژگی فعال' })
    findOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.attributesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'به‌روزرسانی ویژگی (فقط مدیر)' })
    update(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: UpdateAttributeDto,
    ) {
        return this.attributesService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'غیرفعال‌سازی ویژگی (فقط مدیر)' })
    deactivate(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.attributesService.deactivate(id);
    }

    @Post(':id/options')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'ایجاد گزینه برای ویژگی (فقط مدیر)' })
    createOption(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: CreateAttributeOptionDto,
    ) {
        return this.attributesService.createOption(id, dto);
    }

    @Patch('options/:optionId')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'به‌روزرسانی گزینه ویژگی (فقط مدیر)' })
    updateOption(
        @Param('optionId', new ParseEntityIdPipe()) optionId: string,
        @Body() dto: UpdateAttributeOptionDto,
    ) {
        return this.attributesService.updateOption(optionId, dto);
    }

    @Delete('options/:optionId')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'غیرفعال‌سازی گزینه ویژگی (فقط مدیر)' })
    deactivateOption(
        @Param('optionId', new ParseEntityIdPipe()) optionId: string,
    ) {
        return this.attributesService.deactivateOption(optionId);
    }
}
