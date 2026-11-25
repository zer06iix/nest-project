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

@ApiTags('برندها')
@Controller({ path: 'brands', version: '1' })
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Post()
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'ایجاد برند (فقط مدیر)' })
    create(@Body() dto: CreateBrandDto) {
        return this.brandsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'دریافت فهرست برندهای فعال' })
    findAll() {
        return this.brandsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'دریافت برند فعال' })
    findOne(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.brandsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'به‌روزرسانی برند (فقط مدیر)' })
    update(@Param('id', new ParseEntityIdPipe()) id: string, @Body() dto: UpdateBrandDto) {
        return this.brandsService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'غیرفعال‌سازی برند (فقط مدیر)' })
    deactivate(@Param('id', new ParseEntityIdPipe()) id: string) {
        return this.brandsService.deactivate(id);
    }
}
