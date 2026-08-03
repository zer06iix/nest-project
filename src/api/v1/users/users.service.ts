import { BadRequestException, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const existingUser = await this.userRepository.findOne(
                { where: { phoneNumber: createUserDto.phoneNumber } }
            );
            if (existingUser) throw new ConflictException("کاربر با این مشخصات وجود دارد")
            
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
                query.where('users.role = :role', { role });
            }

            query.skip((page - 1) * limit).take(limit);

            return await query.getMany();
        } catch (error) {
            console.log(error)
            throw new BadRequestException("هنگام پیدا کردن کاربران مشکلی رخ داد")
        }
    }

    async findOneById(id: string) {
        try {
            const user = await this.userRepository.findOneBy({ id })
    
            if (!user) throw new NotFoundException(`کاربر با آیدی ${id} پیدا نشد`);
    
            return user;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("هنگام پیدا کردن کاربر مشکلی رخ داد")
        }
    }

    async findOneByPhone(phoneNumber: string) {
        try {
            const user = await this.userRepository.findOneBy({ phoneNumber })
    
            if (!user) throw new NotFoundException(`کاربر با شماره تماس ${phoneNumber} پیدا نشد`);
    
            return user;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("هنگام پیدا کردن کاربر مشکلی رخ داد")
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            await this.userRepository.update(id, {
                displayName: updateUserDto.displayName,
                role: updateUserDto.role
            });
            const user = await this.findOneById(id);
            
            return user;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("هنگام بروزرستنی کاربر مشکلی رخ داد")
        }
    }

    async remove(id: string) {
        try {
            const result = await this.userRepository.delete({ id });
            
            if (result.affected === 0) 
                throw new NotFoundException(`کاربر با آیدی ${id} پیدا نشد`);
        } catch (error) {
            console.log(error)
            throw new BadRequestException("هنگام حذف کاربر مشکلی رخ داد")
        }
    }
}
