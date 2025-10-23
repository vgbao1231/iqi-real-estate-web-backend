import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { handlePrismaError } from 'src/common/utils/prisma-error.handler';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMerchandiseDto } from './dto/CreateMerchandiseDto';
import { UpdateMerchandiseDto } from './dto/UpdateMerchandiseDto';

// Định nghĩa cấu trúc ảnh để dễ dàng truy cập publicId từ Json
interface ImageEntry {
  publicId: string;
  url: string;
}

@Injectable()
export class MerchandiseService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // --- Helper Functions ---
  private getPublicIds(images: any): string[] {
    if (!images || !Array.isArray(images)) return [];
    return images.map((img: ImageEntry) => img.publicId).filter((id) => id);
  }

  private async cleanupImages(publicIds: string[]) {
    if (publicIds.length > 0) {
      try {
        await Promise.all(
          publicIds.map((id) => this.cloudinaryService.deleteFile(id)),
        );
        console.log('Đã xoá các ảnh dư:', publicIds);
      } catch (err) {
        // Chỉ log lỗi, không ném lỗi ra ngoài để không làm hỏng transaction chính
        console.error('Lỗi khi cleanup ảnh dư:', err);
      }
    }
  }

  // --- CRUD Operations ---
  async findAll(options: Prisma.MerchandiseWhereInput = {}) {
    try {
      return await this.prisma.merchandise.findMany({
        orderBy: { createdAt: 'desc' },
        where: options,
      });
    } catch (error) {
      handlePrismaError(error, Entity.MERCHANDISE);
    }
  }

  async findOne(id: string) {
    try {
      const merchandise = await this.prisma.merchandise.findUnique({
        where: { id },
      });

      if (!merchandise) {
        throw AppError.NotFound(Entity.MERCHANDISE);
      }

      return merchandise;
    } catch (error) {
      handlePrismaError(error, Entity.MERCHANDISE);
    }
  }

  async create(data: CreateMerchandiseDto) {
    const publicIdsToCleanup = this.getPublicIds(data.images);
    try {
      const merchandise = await this.prisma.merchandise.create({
        data,
      });

      return {
        message: 'Tạo sản phẩm thành công',
        data: merchandise,
      };
    } catch (error) {
      // Cleanup tất cả ảnh vừa upload nếu lỗi DB
      await this.cleanupImages(publicIdsToCleanup);
      handlePrismaError(error, Entity.MERCHANDISE);
    }
  }

  async update(id: string, data: UpdateMerchandiseDto) {
    let oldPublicIds: string[] = [];
    let newPublicIds: string[] = [];

    try {
      // 1. Kiểm tra tồn tại và lấy Public ID cũ
      const exist = await this.prisma.merchandise.findUnique({
        where: { id },
        select: { images: true },
      });

      if (!exist) {
        throw AppError.NotFound(Entity.MERCHANDISE);
      }

      oldPublicIds = this.getPublicIds(exist.images);
      newPublicIds = this.getPublicIds(data.images);

      // 2. Tìm ảnh cần xoá: ảnh cũ KHÔNG CÓ trong ảnh mới
      const publicIdsToDelete = oldPublicIds.filter(
        (id) => !newPublicIds.includes(id),
      );

      // 3. Xóa các ảnh không còn được sử dụng (async, không chờ)
      if (publicIdsToDelete.length > 0) {
        await this.cleanupImages(publicIdsToDelete);
      }

      // 4. Update sản phẩm trong DB
      const merchandise = await this.prisma.merchandise.update({
        where: { id },
        data,
      });

      return {
        message: 'Cập nhật sản phẩm thành công',
        data: merchandise,
      };
    } catch (error) {
      // Cleanup ảnh mới upload nếu lỗi DB: ảnh trong data.images (newPublicIds)
      // nhưng không có trong ảnh cũ (oldPublicIds) là ảnh mới được upload.
      const uploadedPublicIds = newPublicIds.filter(
        (id) => !oldPublicIds.includes(id),
      );
      await this.cleanupImages(uploadedPublicIds);

      handlePrismaError(error, Entity.MERCHANDISE);
    }
  }

  async delete(id: string) {
    try {
      // 1. Kiểm tra tồn tại và lấy ảnh cũ
      const exist = await this.prisma.merchandise.findUnique({
        where: { id },
        select: { images: true },
      });

      if (!exist) {
        throw AppError.NotFound(Entity.MERCHANDISE);
      }

      const publicIdsToDelete = this.getPublicIds(exist.images);

      // 2. Xóa sản phẩm khỏi DB
      const merchandise = await this.prisma.merchandise.delete({
        where: { id },
      });

      // 3. Xóa ảnh trên Cloudinary (async, không chờ)
      if (publicIdsToDelete.length > 0) {
        await this.cleanupImages(publicIdsToDelete);
      }

      return {
        message: 'Xóa sản phẩm thành công',
        data: merchandise,
      };
    } catch (error) {
      handlePrismaError(error, Entity.MERCHANDISE);
    }
  }
}
