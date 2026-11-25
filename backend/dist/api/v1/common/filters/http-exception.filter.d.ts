import { type ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly handlers;
    catch(exception: unknown, host: ArgumentsHost): void;
    private findHandler;
    private defaultError;
    private handleBadRequest;
    private handleDatabaseError;
}
