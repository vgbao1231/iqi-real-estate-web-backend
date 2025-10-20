import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { AppError } from 'src/common/exceptions/app-error';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/ChangePassworDto';
import { LoginDto } from './dto/LoginDto';
import { UpdateProfileDto } from './dto/UpdateProfileDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, message } = await this.authService.login(
      body.email,
      body.password,
    );

    // Set refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    return { accessToken, message };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Lấy refresh token từ cookie
    const cookies = req.cookies as Record<string, string | undefined>;
    const refreshToken = cookies['refreshToken'];
    if (!refreshToken) {
      throw AppError.Unauthorized('Không tìm thấy refresh token');
    }

    // Xác thực refresh token + tạo token mới
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    // Nếu authService trả về refresh token mới → cập nhật lại cookie
    if (newRefreshToken) {
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return { accessToken };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    // Xóa refresh token trong cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { message: 'Đăng xuất thành công' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request) {
    return this.authService.getProfile(req);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @User('id') userId: string,
    @Body() body: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(userId, body);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @User('id') userId: string,
    @Body() body: ChangePasswordDto,
  ) {
    return this.authService.changePassword(userId, body);
  }
}
