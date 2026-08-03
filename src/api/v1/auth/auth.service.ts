import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    
    async register(phoneNumber: string, displayName: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await this.userService.create({
            phoneNumber,
            displayName,
            password: hashedPassword,
        });

        return newUser;
    }

    async login(phoneNumber: string, password: string) {
        const user = await this.userService.findOneByPhone(phoneNumber);
        if (!(await bcrypt.compare(password, user.password)) || phoneNumber !== user.phoneNumber)
            throw new UnauthorizedException("مشخصات وارد شده اشتباه است");

        const payload = { sub: user.id, phone_number: user.phoneNumber, display_name: user.displayName, role: user.role };
        const token = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>('JWT_SECRET'),
            expiresIn: this.configService.getOrThrow('JWT_EXPIRATION'),
        });

        return {
            access_token: token
        }
    }
}