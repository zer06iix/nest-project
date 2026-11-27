import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	UpdateDateColumn,
} from 'typeorm';
import { Attribute } from './attribute.entity';
import { NanoidEntity } from '../../common/entities/nanoid.entity';

@Entity('attribute_options')
@Index('uq_attribute_options_attribute_value', ['attributeId', 'value'], {
	unique: true,
})
export class AttributeOption extends NanoidEntity {
	@Column({ name: 'attribute_id', type: 'varchar', length: 36 })
	attributeId!: string;

	@ManyToOne(() => Attribute, (attribute) => attribute.options, {
		onDelete: 'RESTRICT',
	})
	@JoinColumn({ name: 'attribute_id' })
	attribute!: Attribute;

	@Column({ length: 120 })
	label!: string;

	@Column({ length: 140 })
	value!: string;

	@Column({ type: 'jsonb', nullable: true })
	metadata!: Record<string, unknown> | null;

	@Column({ name: 'is_active', default: true })
	isActive!: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date;
}
