import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Entity } from 'src/common/enums/entity';
import { ErrorCode } from 'src/common/enums/error-code';
import { AppError } from 'src/common/exceptions/app-error';
import { handlePrismaError } from 'src/common/utils/prisma-error.handler';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        avatarUrl: true,
        avatarPublicId: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        avatarUrl: true,
        avatarPublicId: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          avatarUrl: true,
          avatarPublicId: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: 'Tạo người dùng thành công',
        data: user,
      };
    } catch (error) {
      console.error('Create user error:', error);

      // Nếu create fail mà có avatar mới → cleanup ảnh dư
      if (data.avatarPublicId) {
        try {
          await this.cloudinaryService.deleteFile(data.avatarPublicId);
          console.log('Đã xoá ảnh dư khi create fail:', data.avatarPublicId);
        } catch (err) {
          console.error('Cleanup ảnh dư khi create fail:', err);
        }
      }

      handlePrismaError(error, Entity.USER);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      // 1. Lấy user hiện tại để kiểm tra avatar cũ
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
        select: {
          avatarPublicId: true,
        },
      });

      if (!existingUser) {
        throw AppError.NotFound(Entity.USER);
      }

      // 2. Nếu có avatar mới, xóa ảnh cũ
      if (
        data.avatarPublicId &&
        existingUser.avatarPublicId &&
        data.avatarPublicId !== existingUser.avatarPublicId
      ) {
        try {
          await this.cloudinaryService.deleteFile(existingUser.avatarPublicId);
        } catch (cloudErr) {
          console.error('Lỗi xóa ảnh cũ trên Cloudinary:', cloudErr);
          // Không throw ở đây để tránh fail toàn bộ update user
        }
      }

      // 3. Update user trong DB
      const user = await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          avatarUrl: true,
          avatarPublicId: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: 'Cập nhật người dùng thành công',
        data: user,
      };
    } catch (error) {
      console.error('Prisma Update User Error:', error);

      // Nếu update fail mà có avatar mới → cleanup ảnh dư
      if (data.avatarPublicId) {
        try {
          await this.cloudinaryService.deleteFile(data.avatarPublicId);
          console.log('Đã xoá ảnh dư khi update fail:', data.avatarPublicId);
        } catch (err) {
          console.error('Cleanup ảnh dư khi update fail:', err);
        }
      }

      handlePrismaError(error, Entity.USER);
    }
  }

  async delete(id: string) {
    try {
      // 1. Lấy user trước khi xóa để có avatarPublicId
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
        select: {
          avatarPublicId: true,
        },
      });

      if (!existingUser) {
        throw AppError.NotFound(Entity.USER);
      }

      // 2. Xóa user trong DB
      const user = await this.prisma.user.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          avatarUrl: true,
          avatarPublicId: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // 3. Xóa ảnh cũ (nếu có)
      if (existingUser.avatarPublicId) {
        try {
          await this.cloudinaryService.deleteFile(existingUser.avatarPublicId);
        } catch (cloudErr) {
          console.error('Lỗi xóa ảnh cũ trên Cloudinary:', cloudErr);
          // Không throw để tránh rollback user delete (vì user đã bị xóa khỏi DB)
        }
      }

      return {
        message: 'Xóa người dùng thành công',
        data: user,
      };
    } catch (error) {
      console.error('Prisma Delete User Error:', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2003':
            throw AppError.BadRequest(
              'Không thể xóa người dùng vì đang có dữ liệu liên quan.',
              ErrorCode.RELATION_CONFLICT,
            );

          case 'P2025':
            throw AppError.NotFound(Entity.USER);
        }
      }

      throw AppError.BadRequest(
        error instanceof Error ? error.message : 'Không thể xóa người dùng.',
      );
    }
  }
}
