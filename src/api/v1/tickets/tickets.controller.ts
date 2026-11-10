import {
    Body, Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, Param,
    ParseIntPipe, Patch, Post, Query, Req, UseGuards,
} from '@nestjs/common';
import { type Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateTicketMessageDto } from './dto/create-ticket-message.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsService } from './tickets.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { Role } from '../common/enums/role.enum';
import { TicketStatus } from './enums/ticket-status.enum';

type AuthenticatedRequest = Request & { user: { userId: string; role: Role } };

@ApiTags('Tickets - تیکت ها')
@ApiBearerAuth('jwt')
@UseGuards(JwtAccessGuard)
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('تیکت با موفقیت ساخته شد')
    @ApiOperation({ summary: 'ساخت تیکت' })
    create(@Body() dto: CreateTicketDto, @Req() req: AuthenticatedRequest) {
        return this.ticketService.create(dto, req.user.userId);
    }

    @Get()
    @ResponseMessage('لیست تیکت ها با موفقیت دریافت شد')
    @ApiOperation({ summary: 'دریافت تیکت های کاربر یا همه تیکت ها برای مدیر' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
    @ApiQuery({ name: 'status', required: false, enum: TicketStatus })
    findAll(
        @Req() req: AuthenticatedRequest,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Query('status') status?: TicketStatus,
    ) {
        return this.ticketService.findAll(req.user.userId, req.user.role, page, Math.min(limit, 100), status);
    }

    @Get(':id')
    @ResponseMessage('تیکت با موفقیت پیدا شد')
    @ApiOperation({ summary: 'پیدا کردن یک تیکت' })
    findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        return this.ticketService.findOne(id, req.user.userId, req.user.role);
    }

    @Patch(':id')
    @ResponseMessage('تیکت با موفقیت بروزرسانی شد')
    @ApiOperation({ summary: 'بروزرسانی تیکت؛ وضعیت و تخصیص برای مدیر' })
    update(@Param('id') id: string, @Body() dto: UpdateTicketDto, @Req() req: AuthenticatedRequest) {
        return this.ticketService.update(id, dto, req.user.userId, req.user.role);
    }

    @Post(':id/messages')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('پیام با موفقیت ثبت شد')
    @ApiOperation({ summary: 'ارسال پیام در تیکت' })
    addMessage(
        @Param('id') id: string,
        @Body() dto: CreateTicketMessageDto,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.ticketService.addMessage(id, req.user.userId, req.user.role, dto.body);
    }
}
