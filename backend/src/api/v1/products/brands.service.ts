import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
	constructor(
		@InjectRepository(Brand)
		private readonly brandRepository: Repository<Brand>,
	) {}

	async create(dto: CreateBrandDto) {
		return this.saveWithConflict(() =>
			this.brandRepository.save(this.brandRepository.create(dto)),
		);
	}

	findAll() {
		return this.brandRepository.find({
			where: { isActive: true },
			order: { name: 'ASC' },
		});
	}

	async findOne(id: string) {
		const brand = await this.brandRepository.findOneBy({
			id,
			isActive: true,
		});
		if (!brand) throw new NotFoundException('Brand not found');
		return brand;
	}

	async update(id: string, dto: UpdateBrandDto) {
		const brand = await this.brandRepository.findOneBy({ id });
		if (!brand) throw new NotFoundException('Brand not found');
		Object.assign(brand, dto);
		return this.saveWithConflict(() => this.brandRepository.save(brand));
	}

	async deactivate(id: string) {
		const brand = await this.brandRepository.findOneBy({ id });
		if (!brand) throw new NotFoundException('Brand not found');
		brand.isActive = false;
		await this.brandRepository.save(brand);
		return { id, isActive: false };
	}

	private async saveWithConflict<T>(save: () => Promise<T>): Promise<T> {
		try {
			return await save();
		} catch (error) {
			if (
				error instanceof QueryFailedError &&
				error.driverError &&
				typeof error.driverError === 'object' &&
				error.driverError !== null &&
				'code' in error.driverError &&
				(error.driverError as { code?: unknown }).code === '23505'
			) {
				throw new ConflictException('A brand with this slug already exists');
			}
			throw error;
		}
	}
}
