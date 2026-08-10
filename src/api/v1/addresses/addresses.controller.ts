import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { JwtAccessGuard } from "../auth/guards/jwt-access.guard";
import { RoleGuard } from "../common/guards/role.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressesService } from "./addresses.service";
import { ResponseMessage } from "../common/decorators/response-message.decorator";
import { type Request } from "express";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Roles } from "../common/decorators/role.decorator";
import { Role } from "../common/enums/role.enum";


@ApiTags('Addresses - آدرس های کاربران')
@Controller('addresses')
@UseGuards(JwtAccessGuard, RoleGuard)
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) {}
    
    @Post()
    @ResponseMessage("آدرس با موفقیت ساخته شد")
    @ApiOperation({ summary: "ساخت آدرس جدید" })
    async create(
        @Body() createAddressDto: CreateAddressDto,
        @Param('id') userId: string
    ) {
        return await this.addressesService.create(createAddressDto, userId);
    }
    
    @Get(':id')
    @ResponseMessage('ادرس با موفقیت دریافت شد')
    @ApiOperation({ summary: "دریافت یک آدرس" })
    async findOne(@Param('id') id: string) {
        return await this.addressesService.findOne(id);
    }
    
    @UseGuards(JwtAccessGuard, RoleGuard)
    @Get('user')
    @ResponseMessage('ادرس های کاربر با موفقیت دریافت شد')
    @ApiOperation({ summary: "دریافت آدرس های کاربر درخواست کننده" })
    async findSelfAddresses(@Req() req: Request) {
        const user = req.user as { id: string }
        return await this.addressesService.findUserAddresses(user.id);
    }
    
    @Roles(Role.ADMIN)
    @Get('user/:id')
    @ResponseMessage('ادرس های کاربر با موفقیت دریافت شد')
    @ApiOperation({ summary: "دریافت آدرس های یک کاربر توسط ادمین" })
    async findUserAddresses(@Param('id') userId: string) {
        return await this.addressesService.findUserAddresses(userId);
    }
    
    @Get()
    @ResponseMessage('ادرس های کاربران با موفقیت دریافت شد')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: "دریافت آدرس های تمام کاربران توسط ادمین" })
    async findAllAddresses() {
        return await this.addressesService.findAllAddresses();
    }
    
    @Patch(':id')
    @ResponseMessage('ادرس با موفقیت بروزرسانی شد')
    @ApiOperation({ summary: "بروزرسانی یک آدرس" })
    async update(
        @Body() updateAddressDto: UpdateAddressDto,
        @Param('id') id: string,
    ) {
        return await this.addressesService.update(id, updateAddressDto);
    }
    
    @Delete(':id')
    @ResponseMessage('ادرس با موفقیت حدف شد')
    @ApiOperation({ summary: "حدف کردن یک آدرس" })
    async remove(@Param('id') id: string) {
        return await this.addressesService.remove(id);
    }
}