import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { UsersService } from '../../users/users.service';
import { Role } from '../enums/role.enum';
import { User } from '../../users/entities/user.entity';
import { isDemoAdminId } from '../utils/demo-login';

interface RequestWithUser {
	user?: Pick<User, 'id' | 'role'>;
}

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly userService: UsersService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) return true;

		const request = context.switchToHttp().getRequest<RequestWithUser>();
		const { user } = request;

		if (!user?.id) {
			throw new ForbiddenException('کاربر احراز هویت نشده است');
		}

		const role = isDemoAdminId(user.id)
			? Role.ADMIN
			: (await this.userService.findOneById(user.id)).role;

		const hasRole = requiredRoles.includes(role);

		if (!hasRole) throw new ForbiddenException('شما دسترسی لازم را برای این صفحه ندارید');

		return true;
	}
}
