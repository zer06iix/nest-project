import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokenBlacklistService } from '../blacklist/token-blacklist.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor(
		configService: ConfigService,
		private readonly tokenBlacklistService: TokenBlacklistService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
		});
	}

	validate(payload: Record<string, unknown>) {
		const isBlacklisted = this.tokenBlacklistService.isBlacklisted(payload.jti as string);

		if (isBlacklisted) throw new UnauthorizedException('دوباره وارد شوید');

		return {
			id: payload.sub as string,
			phone_number: payload.phone_number as string,
			display_name: payload.display_name as string,
			role: payload.role as string,
		};
	}
}
