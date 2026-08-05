import { Body, Controller, HttpStatus, Post, Request, Res } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ResponseMessage } from "../common/decorators/response-message.decorator";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('Auth - احراز هویت')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ResponseMessage('با موفقیت ثبت نام کردید')
    @ApiOperation({ summary: "ثبت نام" })
    @ApiBody({ type: RegisterDto })
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
    @ApiOperation({ summary: "وارد شدن" })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto) {
        const user = this.authService.login(
            loginDto.phoneNumber,
            loginDto.password,
        );
        return user;
    }
}