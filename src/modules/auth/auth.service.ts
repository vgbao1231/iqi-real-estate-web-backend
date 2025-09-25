import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import type { Request } from 'express';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { PrismaService } from 'src/modules/prisma/prisma.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
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
    // 1. Tìm user
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw AppError.NotFound(Entity.USER);

    // 2. Kiểm tra password
    const isValid = await bcrypt.compare(password, user.password ?? '');
    if (!isValid) throw AppError.BadRequest('Sai mật khẩu');

    // 3. Tạo JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken, message: 'Đăng nhập thành công' };
  }

  async refreshToken(
    oldRefreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      if (!oldRefreshToken) {
        throw new Error('No refresh token provided');
      }

      // 1) verify refresh token
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        oldRefreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );

      // 2) lấy ra những claim cần dùng (KHÔNG mang iat, exp)
      const { sub, email, role } = payload;
      if (!sub) throw new Error('Invalid refresh token payload');

      const tokenPayload = { sub, email, role };

      // 3) tạo access token mới (ví dụ 30m)
      const newAccessToken = await this.jwtService.signAsync(tokenPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '30m',
      });

      // 4) tạo refresh token mới (rotation)
      const newRefreshToken = await this.jwtService.signAsync(tokenPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      console.log(
        'Refresh token verify failed:',
        err instanceof Error ? err.message : err,
      );
      throw AppError.Unauthorized('Refresh token không hợp lệ');
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
      throw AppError.Unauthorized(); // ✅ đồng bộ AppError
    }

    // Lấy thông tin user từ DB
    const foundUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatarUrl: true,
      },
    });

    if (!foundUser) {
      throw AppError.NotFound(Entity.USER); // ✅ đồng bộ AppError
    }

    return foundUser;
  }
}
