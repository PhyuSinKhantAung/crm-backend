import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await argon.verify(user.password, dto.password);

    if (!isValidPassword) throw new ForbiddenException('Credentials incorrect');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const { accessToken } = await this.generateToken(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
      },
    };
  }

  async generateToken(payload: {
    sub: string;
    email: string;
    role: string;
  }): Promise<{ accessToken: string }> {
    const accessToken = this.jwt.sign(payload, {
      expiresIn: '30d',
      secret: this.config.get('JWT_SECRET'),
    });
    return { accessToken };
  }

  async hashedUserPassword(password: string) {
    return await argon.hash(password);
  }
}
