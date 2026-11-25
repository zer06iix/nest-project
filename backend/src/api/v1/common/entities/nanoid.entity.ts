import { BeforeInsert, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';

export abstract class NanoidEntity {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id!: string;

    @BeforeInsert()
    private generateId() {
        this.id ??= nanoid(8);
    }
}
