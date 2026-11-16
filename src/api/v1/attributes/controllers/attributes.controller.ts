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

@ApiTags('Attributes')
@Controller({ path: 'attributes', version: '1' })
export class AttributesController {
    constructor(private readonly attributesService: AttributesService) {}

    @Post()
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Create an attribute (admin only)' })
    create(@Body() dto: CreateAttributeDto) {
        return this.attributesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'List active attributes' })
    findAll() {
        return this.attributesService.findAll();
    }

    @Get(':id/options')
    @ApiOperation({ summary: 'List active options for an attribute' })
    findOptions(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.attributesService.findOptions(id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an active attribute' })
    findOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.attributesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Update an attribute (admin only)' })
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
    @ApiOperation({ summary: 'Deactivate an attribute (admin only)' })
    deactivate(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.attributesService.deactivate(id);
    }

    @Post(':id/options')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Create an attribute option (admin only)' })
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
    @ApiOperation({ summary: 'Update an attribute option (admin only)' })
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
    @ApiOperation({ summary: 'Deactivate an attribute option (admin only)' })
    deactivateOption(@Param('optionId', new ParseEntityIdPipe()) optionId: string) {
        return this.attributesService.deactivateOption(optionId);
    }
}
