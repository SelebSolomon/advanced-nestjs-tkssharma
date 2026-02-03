import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import TokenPayload from './tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      // This extracts from "Authorization: Bearer <token>" header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload) {
    if (!payload?.userId) {
      throw new UnauthorizedException('Invalid token payload');
    }
    const user = await this.userService.getById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user; // available in req.user
  }
}
