import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { type Request, type Response } from 'express';
interface LoginPayload {
    sub: string;
    phone_number: string;
    display_name: string;
    role: string;
    jti: string;
}
interface LoginResponse {
    payload: LoginPayload;
    accessToken: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../users/entities/user.entity").User>;
    login(res: Response, loginDto: LoginDto): Promise<LoginResponse>;
    logout(req: Request, res: Response, accessToken: string): Promise<void>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    private setRefreshCookie;
}
export {};
