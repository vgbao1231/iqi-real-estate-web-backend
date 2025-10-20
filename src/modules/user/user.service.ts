import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Entity } from 'src/common/enums/entity';
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

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw AppError.NotFound(Entity.USER);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      return {
        message: 'Tạo người dùng thành công',
        data: user,
      };
    } catch (error) {
      console.error('Create user error:', error);

      // Nếu create fail mà có avatar mới → cleanup ảnh dư
      if (data.image?.publicId) {
        try {
          await this.cloudinaryService.deleteFile(data.image?.publicId);
          console.log('Đã xoá ảnh dư khi create fail:', data.image?.publicId);
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
          } catch (cloudErr) {
            console.error('Lỗi xóa ảnh cũ trên Cloudinary:', cloudErr);
          }
        }
      }

      // 3. Update user trong DB
      const user = await this.prisma.user.update({
        where: { id },
        data,
      });

      return {
        message: 'Cập nhật người dùng thành công',
        data: user,
      };
    } catch (error) {
      console.error('Prisma Update User Error:', error);

      // Nếu update fail mà có avatar mới → cleanup ảnh dư
      if (data.image?.publicId) {
        try {
          await this.cloudinaryService.deleteFile(data.image?.publicId);
          console.log('Đã xoá ảnh dư khi update fail:', data.image?.publicId);
        } catch (err) {
          console.error('Cleanup ảnh dư khi update fail:', err);
        }
      }
      handlePrismaError(error, Entity.USER);
    }
  }

  async delete(id: string) {
    try {
      const exist = await this.prisma.user.findUnique({
        where: { id },
        select: {
          image: true,
        },
      });

      if (!exist) {
        throw AppError.NotFound(Entity.USER);
      }

      // 1. Xóa user trong DB
      const user = await this.prisma.user.delete({
        where: { id },
      });

      // 2. Xóa ảnh cũ (nếu có)
      if ((exist.image as { publicId: string }).publicId) {
        try {
          await this.cloudinaryService.deleteFile(
            (exist.image as { publicId: string }).publicId,
          );
        } catch (cloudErr) {
          console.error('Lỗi xóa ảnh trên Cloudinary:', cloudErr);
        }
      }

      return {
        message: 'Xóa người dùng thành công',
        data: user,
      };
    } catch (error) {
      handlePrismaError(error, Entity.USER);
    }
  }
}
