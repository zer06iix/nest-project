import { Entity } from 'typeorm';
import { Nanoid8Entity } from 'api/v1/common/entities/nanoid-8.entity';

@Entity('cart')
export class Cart extends Nanoid8Entity {}
