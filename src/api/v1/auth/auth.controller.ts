import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ResponseMessage } from "../common/decorators/response-message.decorator";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { type Request, type Response } from "express";
import { ConfigService } from "@nestjs/config";
import { RoleGuard } from "../common/guards/role.guard";
import { JwtAccessGuard } from "./guards/jwt-access.guard";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { GetToken } from "./decorators/get-token.decorator";


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
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() loginDto: LoginDto,
    ) {
        const {payload, accessToken, refreshToken } = await this.authService.login(
            loginDto.phoneNumber,
            loginDto.password,
        );

        this.setRefreshCookie(res, refreshToken);
        this.authService.storeRefreshToken(payload.sub, refreshToken)

        return { accessToken };
    }

    @UseGuards(JwtAccessGuard, RoleGuard)
    @Post('logout')
    @ResponseMessage('با موفقیت از حساب خود خارج شدید')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @GetToken() accessToken: string
    ) {
        const user = req.user as { userId: string };

        await this.authService.logout(accessToken, user.userId);
        res.clearCookie('refresh_token');
    }

    @UseGuards(JwtRefreshGuard, RoleGuard)
    @Post('refresh')
    @ResponseMessage('توکن با موفقیت تمدید شد')
    @ApiOperation({ summary: 'رفرش کردن توکن' })
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userFromToken = req.user as { id: string; refreshToken: string };
        
        const { accessToken, refreshToken } = await this.authService.refreshTokens(
            userFromToken.id,
            userFromToken.refreshToken
        );

        this.setRefreshCookie(res, refreshToken);
        return { accessToken };

    }

    private setRefreshCookie(res: Response, refreshToken: string) {
        res.cookie('refresh_token', refreshToken, {
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
    }
}