import {
	Injectable,
	NotFoundException,
	ConflictException,
	BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { normalizeIranPhoneNumber } from '../common/utils/phone';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	private normalizePhone(phone: string): string {
		const normalized = normalizeIranPhoneNumber(phone);
		if (!normalized) throw new BadRequestException('شماره موبایل معتبر نیست');
		return normalized;
	}

	async create(createUserDto: CreateUserDto) {
		const normalizedPhone = this.normalizePhone(createUserDto.phoneNumber);
		const existingUser = await this.userRepository.findOne({
			where: { phoneNumber: normalizedPhone },
		});
		if (existingUser) throw new ConflictException('کاربر با این مشخصات وجود دارد');

		if (createUserDto.password === undefined) {
			throw new BadRequestException('گذرواژه الزامی است');
		}

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
		const newUser = this.userRepository.create({
			...createUserDto,
			phoneNumber: normalizedPhone,
			password: hashedPassword,
		});
		const savedUser = await this.userRepository.save(newUser);

		return savedUser;
	}

	async findAll(role?: Role, limit: number = 20, page: number = 1) {
		const query = this.userRepository.createQueryBuilder('users');
		if (role) {
			query.where('users.role = :role', { role });
		}

		query.skip((page - 1) * limit).take(limit);

		return await query.getMany();
	}

	async findOneById(id: string) {
		const user = await this.userRepository.findOneByOrFail({ id });

		if (!user) throw new NotFoundException(`کاربر با آیدی ${id} پیدا نشد`);

		return user;
	}

	async findOneByPhone(phoneNumber: string) {
		const normalizedPhone = this.normalizePhone(phoneNumber);
		const user = await this.userRepository.findOneBy({
			phoneNumber: normalizedPhone,
		});

		if (!user) throw new NotFoundException(`کاربر با شماره تماس ${phoneNumber} پیدا نشد`);

		return user;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		await this.userRepository.update(id, {
			displayName: updateUserDto.displayName,
			role: updateUserDto.role,
		});
		const user = await this.findOneById(id);

		return user;
	}

	async updateHashedRefreshToken(id: string, hashedRefreshToken: string | null) {
		if (hashedRefreshToken === undefined) throw new NotFoundException('توکنی پیدا نشد');

		await this.userRepository.update(id, { hashedRefreshToken });
	}

	async remove(id: string) {
		const result = await this.userRepository.delete({ id });

		if (result.affected === 0) throw new NotFoundException(`کاربر با آیدی ${id} پیدا نشد`);
	}
}
