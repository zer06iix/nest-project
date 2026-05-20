import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userRepository.create(createUserDto);
    
            return await this.userRepository.save(newUser);
        } catch (error) {
            throw new BadRequestException("هنگام ایجاد کاربر مشکلی رخ داد")
        }
    }

    async findAll() {
        try {
            const users = await this.userRepository.find()
        } catch (error) {
            
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
