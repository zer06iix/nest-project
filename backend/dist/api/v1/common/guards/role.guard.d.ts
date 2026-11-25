import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';
export declare class RoleGuard implements CanActivate {
    private readonly reflector;
    private readonly userService;
    constructor(reflector: Reflector, userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
