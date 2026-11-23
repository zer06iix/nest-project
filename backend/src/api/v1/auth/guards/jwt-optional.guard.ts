import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOptionalGuard extends AuthGuard('jwt-optional') {
    canActivate(context: ExecutionContext) {
        // Always return true to allow the request through
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        // Don't throw on error or missing user, just attach user if available
        return user || null;
    }
}