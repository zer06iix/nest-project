import { Expose, Exclude, Transform } from "class-transformer";

export class UserResponseDto {
    @Expose()
    id: string;
    
    @Expose()
    phoneNumber: string;
    
    @Expose()
    displayName: string;
    
    @Expose()
    role?: string;
    
    @Exclude()
    password?: string;

    @Expose()
    @Transform(({ value }) => value ? value.toISOString() : null)
    createdAt: Date;

    @Expose()
    @Transform(({ value }) => value ? value.toISOString() : null)
    updatedAt: Date;
}