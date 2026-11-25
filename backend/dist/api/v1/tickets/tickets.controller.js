"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
const create_ticket_message_dto_1 = require("./dto/create-ticket-message.dto");
const update_ticket_dto_1 = require("./dto/update-ticket.dto");
const tickets_service_1 = require("./tickets.service");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const response_message_decorator_1 = require("../common/decorators/response-message.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const ticket_status_enum_1 = require("./enums/ticket-status.enum");
const role_guard_1 = require("../common/guards/role.guard");
const role_decorator_1 = require("../common/decorators/role.decorator");
let TicketsController = class TicketsController {
    ticketService;
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    create(dto, req) {
        return this.ticketService.create(dto, req.user.userId);
    }
    findAll(req, page, limit, status) {
        return this.ticketService.findAll(req.user.userId, req.user.role, page, Math.min(limit, 100), status);
    }
    findOne(id, req) {
        return this.ticketService.findOne(id, req.user.userId, req.user.role);
    }
    update(id, dto, req) {
        return this.ticketService.update(id, dto, req.user.userId, req.user.role);
    }
    addMessage(id, dto, req) {
        return this.ticketService.addMessage(id, req.user.userId, req.user.role, dto.body);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, response_message_decorator_1.ResponseMessage)('تیکت با موفقیت ساخته شد'),
    (0, swagger_1.ApiOperation)({ summary: 'ساخت تیکت' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)('لیست تیکت ها با موفقیت دریافت شد'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت تیکت های کاربر یا همه تیکت ها برای مدیر' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 20 }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ticket_status_enum_1.TicketStatus }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('تیکت با موفقیت پیدا شد'),
    (0, swagger_1.ApiOperation)({ summary: 'پیدا کردن یک تیکت' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('تیکت با موفقیت بروزرسانی شد'),
    (0, swagger_1.ApiOperation)({ summary: 'بروزرسانی تیکت؛ وضعیت و تخصیص برای مدیر' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_dto_1.UpdateTicketDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/messages'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, response_message_decorator_1.ResponseMessage)('پیام با موفقیت ثبت شد'),
    (0, swagger_1.ApiOperation)({ summary: 'ارسال پیام در تیکت' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_ticket_message_dto_1.CreateTicketMessageDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "addMessage", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('تیکت‌ها'),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map