"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AllExceptionsFilter = class AllExceptionsFilter {
    handlers = new Map([
        [
            common_1.ConflictException,
            (exception) => ({
                status: common_1.HttpStatus.CONFLICT,
                message: exception.message,
            }),
        ],
        [
            common_1.UnauthorizedException,
            (exception) => ({
                status: common_1.HttpStatus.UNAUTHORIZED,
                message: exception.message === 'Unauthorized'
                    ? 'لطفا وارد حساب خود شوید'
                    : exception.message,
            }),
        ],
        [
            common_1.ForbiddenException,
            (exception) => ({
                status: common_1.HttpStatus.FORBIDDEN,
                message: exception.message,
            }),
        ],
        [
            common_1.NotFoundException,
            (exception) => ({
                status: common_1.HttpStatus.NOT_FOUND,
                message: exception.message,
            }),
        ],
        [
            common_1.BadRequestException,
            (exception) => this.handleBadRequest(exception),
        ],
        [
            typeorm_1.QueryFailedError,
            (exception) => this.handleDatabaseError(exception),
        ],
    ]);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
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
    findHandler(exception) {
        for (const [type, handler] of this.handlers) {
            if (exception instanceof type)
                return handler;
        }
        return undefined;
    }
    defaultError(exception) {
        if (exception instanceof common_1.HttpException)
            return {
                status: exception.getStatus(),
                message: exception.message,
            };
        return { status: 500, message: 'خطای داخلی سرور رخ داده است' };
    }
    handleBadRequest(exception) {
        const response = exception.getResponse();
        return {
            status: 400,
            message: typeof response === 'object' && response !== null
                ? Array.isArray(response.message)
                    ? response.message
                    : (response.message ?? 'درخواست شما نامعتبر است')
                : 'درخواست شما نامعتبر است',
        };
    }
    handleDatabaseError(exception) {
        const driverError = exception.driverError;
        switch (driverError?.code) {
            case '23505':
                return {
                    status: common_1.HttpStatus.CONFLICT,
                    message: 'این مقدار قبلا ثبت شده است',
                };
            case '23503':
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'رکورد مرتبط یافت نشد',
                };
            case '23502':
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'مقدار الزامی وارد نشده است',
                };
            default:
                return {
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'خطا در ارتباط با پایگاه داده',
                };
        }
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=http-exception.filter.js.map