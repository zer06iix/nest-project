import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../common/enums/role.enum';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    private normalizePhone;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(role?: Role, limit?: number, page?: number): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    findOneByPhone(phoneNumber: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updateHashedRefreshToken(id: string, hashedRefreshToken: string | null): Promise<void>;
    remove(id: string): Promise<void>;
}
