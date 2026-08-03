import {
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException,
    Catch,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
    ConflictException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";


type Handler = (exception: any) => { status: number, message: string | string[]};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly handlers = new Map<Function, Handler>([
        [ConflictException, (exception: ConflictException) => ({
            status: HttpStatus.CONFLICT,
            message: exception.message,
        })],
        [UnauthorizedException, (exception: UnauthorizedException) => ({
            status: HttpStatus.UNAUTHORIZED,
            message: exception.message,
        })],
        [ForbiddenException, (exception: ForbiddenException) => ({
            status: HttpStatus.FORBIDDEN,
            message: exception.message,
        })],
        [NotFoundException, (exception: NotFoundException) => ({
            status: HttpStatus.NOT_FOUND,
            message: exception.message,
        })],
        [BadRequestException, exception => this.handleBadRequest(exception)],
        [QueryFailedError, exception => this.handleDatabaseError(exception)],
    ]);
    
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>();
        
        const handler = this.findHandler(exception);
        const { status, message } = handler
        ? handler(exception)
        : this.defaultError(exception)

        // const stack = exception instanceof Error
        // ? console.log(exception.stack) : undefined;

        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            data: null,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }

    private findHandler(exception: any): Handler | undefined {
        for (const [type, handler] of this.handlers) {
            if (exception instanceof (type as any)) return handler;
        }
        return undefined;
    }

    private defaultError(exception: any) {
        if (exception instanceof HttpException)
            return { status: exception.getStatus(), message: exception.message }
        return { status: 500, message: "خطای داخلی سرور رخ داده است" };
    }

    private handleBadRequest(exception: BadRequestException) {
        const response = exception.getResponse() as any;
        return {
            status: 400,
            message: Array.isArray(response?.message) ? response.message : response?.message ?? "درخواست شما نامعتبر است"
        }
    }

    private handleDatabaseError(exception: QueryFailedError) {
        const driverError = (exception as any).driverError;

        switch (driverError?.code) {
            case '23505': // Postgres unique_violation
                return {
                    status: HttpStatus.CONFLICT,
                    message: 'این مقدار قبلا ثبت شده است',
                };
            case '23503': // Postgres foreign_key_violation
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'رکورد مرتبط یافت نشد',
                };
            case '23502': // Postgres not_null_violation
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'مقدار الزامی وارد نشده است',
                };
            default:
                return {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'خطا در ارتباط با پایگاه داده',
                };
    }
    }
}