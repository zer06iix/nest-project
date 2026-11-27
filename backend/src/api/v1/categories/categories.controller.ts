import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryAttributeDto } from '../attributes/dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../attributes/dto/update-category-attribute.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../common/enums/role.enum';
import { ParseEntityIdPipe } from '../common/pipes/parse-entity-id.pipe';

@ApiTags('دسته‌بندی‌ها')
@Controller({ path: 'categories', version: '1' })
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'ایجاد دسته‌بندی (فقط مدیر)' })
	create(@Body() dto: CreateCategoryDto) {
		return this.categoriesService.create(dto);
	}

	@Get()
	@ApiOperation({ summary: 'دریافت دسته‌بندی‌های فعال به‌صورت سلسله‌مرتب' })
	findAll() {
		return this.categoriesService.findAll();
	}

	@Get(':slug/attributes')
	@ApiOperation({ summary: 'دریافت پیکربندی ویژگی‌های فعال دسته‌بندی' })
	findAttributes(@Param('slug') slug: string) {
		return this.categoriesService.findAttributesBySlug(slug);
	}

	@Get(':slug')
	@ApiOperation({ summary: 'دریافت دسته‌بندی فعال بر اساس نامک' })
	findOne(@Param('slug') slug: string) {
		return this.categoriesService.findOneBySlug(slug);
	}

	@Patch(':id')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'به‌روزرسانی دسته‌بندی (فقط مدیر)' })
	update(@Param('id', new ParseEntityIdPipe()) id: string, @Body() dto: UpdateCategoryDto) {
		return this.categoriesService.update(id, dto);
	}

	@Delete(':id')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'غیرفعال‌سازی دسته‌بندی (فقط مدیر)' })
	deactivate(@Param('id', new ParseEntityIdPipe()) id: string) {
		return this.categoriesService.deactivate(id);
	}

	@Post(':id/attributes')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'انتساب ویژگی به دسته‌بندی (فقط مدیر)' })
	addAttribute(
		@Param('id', new ParseEntityIdPipe()) id: string,
		@Body() dto: CreateCategoryAttributeDto,
	) {
		return this.categoriesService.addAttribute(id, dto);
	}

	@Patch(':id/attributes/:attributeId')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({
		summary: 'به‌روزرسانی پیکربندی ویژگی دسته‌بندی (فقط مدیر)',
	})
	updateAttribute(
		@Param('id', new ParseEntityIdPipe()) id: string,
		@Param('attributeId', new ParseEntityIdPipe()) attributeId: string,
		@Body() dto: UpdateCategoryAttributeDto,
	) {
		return this.categoriesService.updateAttribute(id, attributeId, dto);
	}

	@Delete(':id/attributes/:attributeId')
	@UseGuards(JwtAccessGuard, RoleGuard)
	@Roles(Role.ADMIN)
	@ApiBearerAuth('jwt')
	@ApiOperation({ summary: 'حذف ویژگی از دسته‌بندی (فقط مدیر)' })
	removeAttribute(
		@Param('id', new ParseEntityIdPipe()) id: string,
		@Param('attributeId', new ParseEntityIdPipe()) attributeId: string,
	) {
		return this.categoriesService.removeAttribute(id, attributeId);
	}
}
