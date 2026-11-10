import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { type Request } from "express";
import { TicketsService } from "./tickets.service";
import { JwtAccessGuard } from "../auth/guards/jwt-access.guard";
import { RoleGuard } from "../common/guards/role.guard";
import { ResponseMessage } from "../common/decorators/response-message.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('Tickets - تیکت ها')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) {}

    @UseGuards(JwtAccessGuard, RoleGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('تیکت با موفقیت ساخته شد')
    @ApiOperation({ summary: 'ساخت تیکت' })
    async create(
        @Body() createTicketDto: CreateTicketDto,
        @Req() req: Request,
    ) {
        const user = req.user as { userId: string };
        
        return await this.ticketService.create(createTicketDto, user.userId);
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('تیکت با موفقیت پیدا شد')
    @ApiOperation({ summary: 'پیدا کردن یک تیکت' })
    async findOne(@Param('id') id: string) {
        return await this.ticketService.findOne(id);
    }
}