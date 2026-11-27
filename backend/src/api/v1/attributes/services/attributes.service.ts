import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Attribute } from '../entities/attribute.entity';
import { AttributeOption } from '../entities/attribute-option.entity';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { CreateAttributeOptionDto } from '../dto/create-attribute-option.dto';
import { UpdateAttributeOptionDto } from '../dto/update-attribute-option.dto';
import { AttributeDataType } from '../enums/attribute-datatype.enum';

@Injectable()
export class AttributesService {
	constructor(
		@InjectRepository(Attribute)
		private readonly attributeRepository: Repository<Attribute>,
		@InjectRepository(AttributeOption)
		private readonly optionRepository: Repository<AttributeOption>,
	) {}

	async create(dto: CreateAttributeDto) {
		if (await this.attributeRepository.existsBy({ slug: dto.slug })) {
			throw new ConflictException('An attribute with this slug already exists');
		}
		return this.saveWithConflict(
			() => this.attributeRepository.save(this.attributeRepository.create(dto)),
			'An attribute with this slug already exists',
		);
	}

	findAll() {
		return this.attributeRepository.find({
			where: { isActive: true },
			order: { name: 'ASC' },
		});
	}

	async findOne(id: string) {
		const attribute = await this.findAttributeById(id);
		if (!attribute.isActive) throw new NotFoundException('Attribute not found');
		return attribute;
	}

	async update(id: string, dto: UpdateAttributeDto) {
		const attribute = await this.findAttributeById(id);
		if (Object.keys(dto).length === 0) {
			throw new BadRequestException('At least one attribute field must be provided');
		}
		if (dto.slug && dto.slug !== attribute.slug) {
			if (await this.attributeRepository.existsBy({ slug: dto.slug })) {
				throw new ConflictException('An attribute with this slug already exists');
			}
		}
		if (
			dto.dataType &&
			dto.dataType !== attribute.dataType &&
			(await this.optionRepository.existsBy({ attributeId: id }))
		) {
			throw new BadRequestException(
				'The data type cannot change while the attribute has options',
			);
		}

		Object.assign(attribute, dto);
		return this.saveWithConflict(
			() => this.attributeRepository.save(attribute),
			'An attribute with this slug already exists',
		);
	}

	async deactivate(id: string) {
		const attribute = await this.findAttributeById(id);
		attribute.isActive = false;
		await this.attributeRepository.save(attribute);
		return { id: attribute.id, isActive: attribute.isActive };
	}

	async findOptions(attributeId: string) {
		const attribute = await this.findAttributeById(attributeId);
		if (!attribute.isActive) throw new NotFoundException('Attribute not found');
		return this.optionRepository.find({
			where: { attributeId, isActive: true },
			order: { label: 'ASC' },
		});
	}

	async createOption(attributeId: string, dto: CreateAttributeOptionDto) {
		const attribute = await this.findAttributeById(attributeId);
		if (!attribute.isActive) throw new NotFoundException('Attribute not found');
		if (attribute.dataType !== AttributeDataType.OPTION) {
			throw new BadRequestException('Options can only be added to OPTION attributes');
		}
		if (
			await this.optionRepository.existsBy({
				attributeId,
				value: dto.value,
			})
		) {
			throw new ConflictException('This option value already exists for the attribute');
		}
		return this.saveWithConflict(
			() => this.optionRepository.save(this.optionRepository.create({ ...dto, attributeId })),
			'This option value already exists for the attribute',
		);
	}

	async updateOption(optionId: string, dto: UpdateAttributeOptionDto) {
		const option = await this.optionRepository.findOneBy({ id: optionId });
		if (!option) throw new NotFoundException('Attribute option not found');
		if (Object.keys(dto).length === 0) {
			throw new BadRequestException('At least one option field must be provided');
		}
		if (dto.value && dto.value !== option.value) {
			const duplicate = await this.optionRepository.existsBy({
				attributeId: option.attributeId,
				value: dto.value,
			});
			if (duplicate)
				throw new ConflictException('This option value already exists for the attribute');
		}
		Object.assign(option, dto);
		return this.saveWithConflict(
			() => this.optionRepository.save(option),
			'This option value already exists for the attribute',
		);
	}

	async deactivateOption(optionId: string) {
		const option = await this.optionRepository.findOneBy({ id: optionId });
		if (!option) throw new NotFoundException('Attribute option not found');
		option.isActive = false;
		await this.optionRepository.save(option);
		return { id: option.id, isActive: option.isActive };
	}

	private async findAttributeById(id: string) {
		const attribute = await this.attributeRepository.findOneBy({ id });
		if (!attribute) throw new NotFoundException('Attribute not found');
		return attribute;
	}

	private async saveWithConflict<T>(save: () => Promise<T>, message: string): Promise<T> {
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
				throw new ConflictException(message);
			}
			throw error;
		}
	}
}
