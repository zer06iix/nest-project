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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/enums/role.enum';
import { ResponseMessage } from '../common/decorators/response-message.decorator';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ResponseMessage("کاربر با موفقیت ساخته شد")
    async create(@Body() createUserDto: CreateUserDto) {
        const createUser = await this.usersService.create(createUserDto);
        return createUser;
    }

    @Get()
    @ResponseMessage('لیست کابران با موفقیت پیدا شد`')
    async findAll(
        @Query('role') role?: Roles,
        @Query('limit', new DefaultValuePipe(20),ParseIntPipe) limit?: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    ) {
        const users = await this.usersService.findAll(role, limit, page);
        return users;
    }

    @Get(':id')
    @ResponseMessage("کاربر با موفقیت پیدا شد")
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOneById(id);
        return user;
    }

    @Patch(':id')
    @ResponseMessage("کاربر با موفقیت بروزرسانی شد")
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        return user;
    }

    @Delete(':id')
    @ResponseMessage("کاربر با موفقیت حذف شد")
    async remove(@Param('id') id: string) {
        const user = await this.usersService.remove(id);
        return user;
    }
}
