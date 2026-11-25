import { Role } from '../../common/enums/role.enum';
export declare class CreateUserDto {
    phoneNumber: string;
    displayName: string;
    password?: string;
    role?: Role;
}
