import { Expose, Exclude, Transform, Type } from 'class-transformer';

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
	@Type(() => String)
	@Transform(({ value }: { value: Date }) => (value ? value.toISOString() : null))
	createdAt: Date;

	@Expose()
	@Type(() => String)
	@Transform(({ value }: { value: Date }) => (value ? value.toISOString() : null))
	updatedAt: Date;
}
