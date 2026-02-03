import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
import * as bcrypt from 'bcryptjs';
// import PostgresErrorCode from '../utils/utils/';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    console.log(registrationData);
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      // createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      // if (error?.code === PostgresErrorCode.UniqueViolation) {
      //   throw new HttpException(
      //     'User with that email already exists',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // public getCookieWithJwtToken(userId: string) {
  //   const payload: TokenPayload = { userId };
  //   // const expiry = Number(
  //   //   this.configService.get<string>('JWT_EXPIRATION_TIME'),
  //   // );
  //   const token = this.jwtService.sign(payload, { expiresIn: '7d' });
  //   // console.log(
  //   //   `token: ${this.configService.get<number>('JWT_EXPIRATION_TIME')}`,
  //   // );
  //   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     'JWT_EXPIRATION_TIME',
  //   )}`;
  // }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };

    // JWT itself can use '7d' (JWT library parses this)
    const token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    // Max-Age for cookie must be in seconds (7 days)
    const maxAge = 7 * 24 * 60 * 60; // 604800 seconds

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${maxAge}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      console.log(user);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
