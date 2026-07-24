import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpStatus,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
} from '@nestjs/common';
import { type Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './enums/RoleEnum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const createUser = await this.usersService.create(createUserDto);

        return res.status(HttpStatus.CREATED).json({
            success: true,
            status_code: HttpStatus.CREATED,
            data: createUser,
            message: "کاربر با موفقیت ساخته شد"
        });
    }

    @Get()
    async findAll(
        @Res() res: Response,
        @Query('role') role?: Roles,
        @Query('limit', new DefaultValuePipe(20),ParseIntPipe) limit?: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    ) {
        const users = await this.usersService.findAll(role, limit, page);

        return res.status(HttpStatus.OK).json({
            success: true,
            status_code: HttpStatus.OK,
            data: users,
            message: `لیست کابران با موفقیت پیدا شد`
        })
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        const user = await this.usersService.findOne(id);

        return res.status(HttpStatus.OK).json({
            success: true,
            status_code: HttpStatus.OK,
            data: user,
            message: "کاربر با موفقیت پیدا شد"
        })
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
        const user = await this.usersService.update(+id, updateUserDto);

        return res.status(HttpStatus.OK).json({
            success: true,
            status_code: HttpStatus.OK,
            data: user,
            message: "کاربر با موفقیت بروزرسانی شد"
        })
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        const user = await this.usersService.remove(id);

        return res.status(HttpStatus.OK).json({
            success: true,
            status_code: HttpStatus.OK,
            data: user,
            message: "کاربر با موفقیت حذف شد"
        })
    }
}
