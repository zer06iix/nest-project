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
        @Query('role') role?: Roles,
        @Query('limit', new DefaultValuePipe(20),ParseIntPipe) limit?: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    ) {
        return await this.usersService.findAll(role, limit, page);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
