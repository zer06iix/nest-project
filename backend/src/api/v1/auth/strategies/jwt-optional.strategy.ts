import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokenBlacklistService } from '../blacklist/token-blacklist.service';

@Injectable()
export class JwtOptionalStrategy extends PassportStrategy(Strategy, 'jwt-optional') {
	constructor(
		configService: ConfigService,
		private readonly tokenBlacklistService: TokenBlacklistService,
	) {
		super({
			jwtFromRequest: (req) => {
				// Try to extract token from Authorization header
				const authHeader = req.headers?.authorization;
				if (authHeader && authHeader.startsWith('Bearer ')) {
					return authHeader.substring(7);
				}
				return null;
			},
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
			passReqToCallback: false,
		});
	}

	validate(payload: Record<string, unknown>) {
		// If no payload (no token provided), return null
		if (!payload) {
			return null;
		}

		const isBlacklisted = this.tokenBlacklistService.isBlacklisted(payload.jti as string);

		if (isBlacklisted) {
			return null;
		}

		return {
			id: payload.sub as string,
			phone_number: payload.phone_number as string,
			display_name: payload.display_name as string,
			role: payload.role as string,
		};
	}
}
