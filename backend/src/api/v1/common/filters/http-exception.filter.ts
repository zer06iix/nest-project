import {
    type ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException,
    Catch,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
    ConflictException,
} from '@nestjs/common';
// import { SentryExceptionCaptured } from '@sentry/nestjs';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface ErrorResponse {
    status: number;
    message: string | string[];
}

type Handler = (exception: unknown) => ErrorResponse;

type ExceptionConstructor = new (...args: unknown[]) => Error;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly handlers: Map<ExceptionConstructor, Handler> = new Map<
        ExceptionConstructor,
        Handler
    >([
        [
            ConflictException,
            (exception: ConflictException): ErrorResponse => ({
                status: HttpStatus.CONFLICT,
                message: exception.message,
            }),
        ],
        [
            UnauthorizedException,
            (exception: UnauthorizedException): ErrorResponse => ({
                status: HttpStatus.UNAUTHORIZED,
                message:
                    exception.message === 'Unauthorized'
                        ? 'لطفا وارد حساب خود شوید'
                        : exception.message,
            }),
        ],
        [
            ForbiddenException,
            (exception: ForbiddenException): ErrorResponse => ({
                status: HttpStatus.FORBIDDEN,
                message: exception.message,
            }),
        ],
        [
            NotFoundException,
            (exception: NotFoundException): ErrorResponse => ({
                status: HttpStatus.NOT_FOUND,
                message: exception.message,
            }),
        ],
        [
            BadRequestException,
            (exception: BadRequestException): ErrorResponse => this.handleBadRequest(exception),
        ],
        [
            QueryFailedError,
            (exception: QueryFailedError): ErrorResponse => this.handleDatabaseError(exception),
        ],
    ]);

    // @SentryExceptionCaptured()
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const handler = this.findHandler(exception);
        const { status, message } = handler ? handler(exception) : this.defaultError(exception);

        if (exception instanceof Error) {
            console.log(exception.stack);
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            data: null,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }

    private findHandler(exception: unknown): Handler | undefined {
        for (const [type, handler] of this.handlers) {
            if (exception instanceof type) return handler;
        }
        return undefined;
    }

    private defaultError(exception: unknown) {
        if (exception instanceof HttpException)
            return {
                status: exception.getStatus(),
                message: exception.message,
            };
        return { status: 500, message: 'خطای داخلی سرور رخ داده است' };
    }

    private handleBadRequest(exception: BadRequestException) {
        const response = exception.getResponse() as string | { message?: string | string[] };
        return {
            status: 400,
            message:
                typeof response === 'object' && response !== null
                    ? Array.isArray(response.message)
                        ? response.message
                        : (response.message ?? 'درخواست شما نامعتبر است')
                    : 'درخواست شما نامعتبر است',
        };
    }

    private handleDatabaseError(exception: QueryFailedError) {
        const driverError = exception.driverError as { code?: string } | undefined;

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
