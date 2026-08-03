import { Body, Controller, HttpStatus, Post, Request, Res } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UsersService } from "../users/users.service";
import { type Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ResponseMessage } from "../common/decorators/response-message.decorator";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto,) {
        const createdUser = await this.authService.register(
            registerDto.phoneNumber,
            registerDto.displayName,
            registerDto.password,
        );
        return createdUser;
    }

    @Post('login')
    @ResponseMessage('با موفقیت وارد شدید')
    async login(@Body() loginDto: LoginDto) {
        const user = this.authService.login(
            loginDto.phoneNumber,
            loginDto.password,
        );
        return user;
    }
}