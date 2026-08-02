import {
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException,
    Catch,
} from "@nestjs/common";
import { Request, Response } from "express";


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        
        const status = 
            exception instanceof HttpException 
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const message = 
            exception instanceof HttpException 
            ? exception.message
            : 'مشکلی پیش آمده است';
        
        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            data: null,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest<Request>().url
        })
    }
}