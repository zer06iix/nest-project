import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../common/enums/role.enum';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('Users - مدیریت کاربران')
@ApiBearerAuth('jwt')
@Controller('users')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Roles(Role.ADMIN)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ResponseMessage("کاربر با موفقیت ساخته شد")
    @ApiOperation({ summary: "ساخت کاربر" })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto) {
        const createUser = await this.usersService.create(createUserDto);
        return createUser;
    }

    @Get()
    @ResponseMessage('لیست کابران با موفقیت دریافت شد`')
    @ApiOperation({ summary: "دریافت کل کاربران" })
    @ApiQuery({
        name: "role",
        required: false,
        default: Role.USER,
        enum: Role,
        description: "مقام کاربر"
    })
    @ApiQuery({
        name: "limit",
        required: false,
        default: 20,
        description: "تعداد نتیجه های قابل نمایش صفحه"
    })
    @ApiQuery({
        name: "page",
        required: false,
        default: 1,
        description: "صفحه"
    })
    async findAll(
        @Query('role') role?: Role,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    ) {
        const users = await this.usersService.findAll(role, limit, page);
        return users;
    }

    @Get(':id')
    @ResponseMessage("کاربر با موفقیت پیدا شد")
    @ApiOperation({ summary: "دریافت یک کاربر" })
    @ApiParam({
        name: "id",
        description: "آیدی کاربر مورد نظر"
    })
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOneById(id);
        return user;
    }

    @Patch(':id')
    @ResponseMessage("کاربر با موفقیت بروزرسانی شد")
    @ApiOperation({ summary: "بروزرسانی کاربر" })
    @ApiBody({ type: UpdateUserDto })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        return user;
    }

    @Delete(':id')
    @ResponseMessage("کاربر با موفقیت حذف شد")
    @ApiOperation({ summary: "حذف کاربر" })
    async remove(@Param('id') id: string) {
        const user = await this.usersService.remove(id);
        return user;
    }
}
