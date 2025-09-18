import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        avatar: true,
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
        avatar: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.create({
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          avatar: true,
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email đã tồn tại.');
        }
      }
      throw new BadRequestException('Không thể tạo người dùng.');
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          avatar: true,
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
      console.error('Prisma Update User Error:', error); // 🛑 Log chi tiết lỗi ra console

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Không tìm thấy người dùng với id = ${id}`,
          );
        }
        if (error.code === 'P2002') {
          throw new BadRequestException('Email đã tồn tại.');
        }
      }

      // Trả luôn message lỗi gốc (nếu có) để dễ debug
      throw new BadRequestException(
        error instanceof Error
          ? error.message
          : 'Không thể cập nhật người dùng.',
      );
    }
  }

  async delete(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          avatar: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return {
        message: 'Xóa người dùng thành công',
        data: user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Không thể xóa người dùng vì đang có dữ liệu liên quan.',
          );
        }
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Không tìm thấy người dùng với id = ${id}`,
          );
        }
      }
      throw new BadRequestException('Không thể xóa người dùng.');
    }
  }
}
