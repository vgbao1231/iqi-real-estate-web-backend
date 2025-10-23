import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import type { Request } from 'express';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { handlePrismaError } from 'src/common/utils/prisma-error.handler';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EmailService } from '../email/email.service';
import { ChangePasswordDto } from './dto/ChangePassworDto';
import { UpdateProfileDto } from './dto/UpdateProfileDto';

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
    private cloudinaryService: CloudinaryService,
    private emailService: EmailService,
  ) {}

  async login(email: string, password: string) {
    // 1. Tìm user
    const user = await this.prisma.user.findUnique({ where: { email } });
    console.log(user);

    // 2. Kiểm tra password
    const isValid =
      user && (await bcrypt.compare(password, user.password ?? ''));
    if (!isValid) throw AppError.BadRequest('Email hoặc mật khẩu không hợp lệ');

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
      if (!sub) throw new Error('Refresh token không hợp lệ');

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
        image: true,
      },
    });

    if (!foundUser) {
      throw AppError.NotFound(Entity.USER); // ✅ đồng bộ AppError
    }

    return foundUser;
  }

  async updateProfile(id: string, data: UpdateProfileDto) {
    try {
      // 1. Lấy user hiện tại để kiểm tra avatar cũ
      const exist = await this.prisma.user.findUnique({
        where: { id },
        select: {
          image: true,
        },
      });

      if (!exist) {
        throw AppError.NotFound(Entity.USER);
      }

      const oldPublicId = (exist.image as { publicId: string })?.publicId;
      const newPublicId = data.image?.publicId;

      // 2. Logic XÓA ẢNH CŨ TRÊN CLOUDINARY
      if (oldPublicId) {
        const shouldDeleteOldImage =
          !newPublicId || newPublicId !== oldPublicId;

        if (shouldDeleteOldImage) {
          try {
            await this.cloudinaryService.deleteFile(oldPublicId);
            console.log(`Đã xóa ảnh cũ thành công: ${oldPublicId}`);
          } catch (cloudErr) {
            // Ghi log lỗi nhưng không throw để việc update DB vẫn diễn ra
            console.error('Lỗi xóa ảnh cũ trên Cloudinary:', cloudErr);
          }
        }
      }

      // 3. Update user trong DB
      const user = await this.prisma.user.update({
        where: { id },
        data, // Cập nhật dữ liệu
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
        },
      });

      return {
        message: 'Cập nhật thông tin cá nhân thành công',
        data: user,
      };
    } catch (error) {
      console.error('Prisma Update Profile Error:', error);

      // Nếu update fail mà có avatar mới → cleanup ảnh dư
      if (data.image?.publicId) {
        try {
          await this.cloudinaryService.deleteFile(data.image.publicId);
          console.log('Đã xoá ảnh dư khi update fail:', data.image.publicId);
        } catch (err) {
          console.error('Cleanup ảnh dư khi update fail:', err);
        }
      }

      // Xử lý lỗi Prisma (Unique constraint,...)
      handlePrismaError(error, Entity.USER);
    }
  }

  async changePassword(userId: string, data: ChangePasswordDto) {
    try {
      // 1. Kiểm tra xác nhận mật khẩu
      if (data.newPassword !== data.confirmNewPassword) {
        throw AppError.BadRequest(
          'Mật khẩu mới và mật khẩu xác nhận không khớp',
        );
      }

      // 2. Lấy user và mật khẩu đã băm
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, password: true },
      });

      if (!user) {
        throw AppError.NotFound(Entity.USER);
      }

      // 3. So sánh mật khẩu hiện tại với mật khẩu đã băm trong DB
      const isMatch = await bcrypt.compare(data.currentPassword, user.password);

      if (!isMatch) {
        throw AppError.Forbidden('Mật khẩu hiện tại không đúng');
      }

      // 4. Băm mật khẩu mới
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.newPassword, salt);

      // 5. Cập nhật mật khẩu trong DB
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      return { message: 'Đổi mật khẩu thành công' };
    } catch (error) {
      console.error('Prisma Change Password Error:', error);
      handlePrismaError(error, Entity.USER);
    }
  }

  async sendOtp(data: { email: string }) {
    try {
      const { email } = data;

      // 1. Tạo mã OTP và thời gian hết hạn
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Hết hạn sau 5 phút

      // 2. LƯU/CẬP NHẬT OTP vào bảng Otp (Upsert)
      await this.prisma.otp.upsert({
        where: { email },
        update: { otpCode, expiresAt },
        create: { email, otpCode, expiresAt },
      });

      // 3. Gửi OTP qua email.
      await this.emailService.sendOtp(email, otpCode, 'Khách hàng quan tâm');

      return {
        message:
          'Mã xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư để hoàn tất.',
      };
    } catch (error) {
      console.error('Send OTP Error:', error);
      // Ở đây, lỗi thường liên quan đến DB (Prisma) hoặc Gửi Email.
      handlePrismaError(error, Entity.OTP); // Dùng Entity chung hoặc 'OTP'
    }
  }

  async verifyOtp(data: { email: string; otp: string }) {
    try {
      const { email, otp } = data;

      // 1. Tìm bản ghi OTP dựa trên email
      const otpRecord = await this.prisma.otp.findUnique({
        where: { email },
      });

      if (!otpRecord) {
        throw AppError.BadRequest(
          'Email chưa được gửi mã OTP hoặc đã hết hạn.',
        );
      }

      // 2. Kiểm tra mã OTP
      if (otpRecord.otpCode !== otp) {
        throw AppError.Forbidden('Mã OTP không hợp lệ.');
      }

      // 3. Kiểm tra thời gian hết hạn
      if (otpRecord.expiresAt < new Date()) {
        // Xóa mã OTP đã hết hạn
        await this.prisma.otp.delete({ where: { email } });
        throw AppError.Forbidden('Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.');
      }

      // 4. Xác thực thành công: Xóa mã OTP đã sử dụng
      await this.prisma.otp.delete({ where: { email } });

      // Trả về thông báo thành công hoặc một token/trạng thái cho phép user đổi mật khẩu
      return {
        message: 'Xác thực OTP thành công.',
        // Ví dụ: return một temporary token để xác nhận bước tiếp theo
      };
    } catch (error) {
      console.error('Prisma Verify OTP Error:', error);
      // Xử lý lỗi Prisma và AppError
      handlePrismaError(error, Entity.OTP);
    }
  }
}
