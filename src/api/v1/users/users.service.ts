import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from './enums/RoleEnum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = this.userRepository.create(createUserDto);
            const savedUser = await this.userRepository.save(newUser);

            return savedUser;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("هنگام ایجاد کاربر مشکلی رخ داد")
        }
    }

    async findAll(
        role?: Roles,
        limit: number = 20,
        page: number = 1
    ) {
        try {
            const query = this.userRepository.createQueryBuilder('users');
            if (role) {
                query.where('users.role = :role', { role: role });
            }

            query.skip((page - 1) * limit).take(limit);

            return await query.getMany();
        } catch (error) {
            return error.message;
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
