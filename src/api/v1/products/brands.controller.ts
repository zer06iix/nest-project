import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../common/enums/role.enum';
import { ParseEntityIdPipe } from '../common/pipes/parse-entity-id.pipe';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('Brands')
@Controller({ path: 'brands', version: '1' })
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Post()
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Create a brand (admin only)' })
    create(@Body() dto: CreateBrandDto) {
        return this.brandsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'List active brands' })
    findAll() {
        return this.brandsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an active brand' })
    findOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.brandsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Update a brand (admin only)' })
    update(
        @Param('id', new ParseEntityIdPipe()) id: string,
        @Body() dto: UpdateBrandDto,
    ) {
        return this.brandsService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Deactivate a brand (admin only)' })
    deactivate(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.brandsService.deactivate(id);
    }
}
