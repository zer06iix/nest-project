import { User } from '../../users/entities/user.entity';
import { NanoidEntity } from '../../common/entities/nanoid.entity';
export declare class Address extends NanoidEntity {
    province: string;
    city: string;
    address: string;
    postalCode: string;
    receiverMobile: string;
    description: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
