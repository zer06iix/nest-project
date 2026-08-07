import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const GetToken = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        return authHeader.split(' ')[1];
    }
)