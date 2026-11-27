import { BeforeInsert, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';

export abstract class Nanoid8Entity {
	@PrimaryColumn({ type: 'varchar', length: 8 })
	id!: string;

	@BeforeInsert()
	private generateId() {
		this.id ??= nanoid(8);
	}
}
