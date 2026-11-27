import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetToken = createParamDecorator(
	(data: unknown, context: ExecutionContext): string | undefined => {
		const request = context.switchToHttp().getRequest<Request>();
		const authHeader = request.headers.authorization;

		if (!authHeader) return undefined;
		return authHeader.split(' ')[1];
	},
);
