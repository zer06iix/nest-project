import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { RESPONSE_MESSAGE_KEY } from "../decorators/response-message.decorator";


export interface Response<T> {
    statusCode: number,
    message: string,
    data: T,
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

        const message = this.reflector.getAllAndOverride(RESPONSE_MESSAGE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) ?? "عملیات با موفقیت انجام شد";

        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map(data => ({
                success: true,
                statusCode: response.statusCode,
                message,
                data
            }))
        )
    }
}
