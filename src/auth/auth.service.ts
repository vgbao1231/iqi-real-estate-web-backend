import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import type { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Email không tồn tại');

    const isValid = await bcrypt.compare(password, user.password ?? '');
    if (!isValid) throw new BadRequestException('Sai mật khẩu');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken, user };
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }
  }

  async getProfile(req: Request) {
    // 👇 Lấy user từ request đã được JwtAuthGuard gắn vào
    const user = req.user as {
      id: string;
      email: string;
      role: string;
    };

    if (!user) {
      throw new UnauthorizedException('Bạn chưa đăng nhập');
    }

    // Lấy thông tin user từ DB
    const foundUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('Không tìm thấy user');
    }

    return foundUser;
  }
}
