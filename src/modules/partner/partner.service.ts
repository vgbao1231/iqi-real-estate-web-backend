import { Injectable } from '@nestjs/common';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { handlePrismaError } from 'src/common/utils/prisma-error.handler';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerDto } from './dto/CreatePartnerDto';
import { UpdatePartnerDto } from './dto/UpdatePartnerDto';

@Injectable()
export class PartnerService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll() {
    return this.prisma.partner.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const partner = await this.prisma.partner.findUnique({ where: { id } });
    if (!partner) {
      throw AppError.NotFound(Entity.PARTNER);
    }
    return partner;
  }

  async create(data: CreatePartnerDto) {
    try {
      const partner = await this.prisma.partner.create({ data });

      return {
        message: 'Thêm đối tác thành công',
        data: partner,
      };
    } catch (error) {
      if (data.image?.publicId) {
        try {
          await this.cloudinaryService.deleteFile(data.image?.publicId);
          console.log('Đã xoá ảnh dư khi create fail:', data.image?.publicId);
        } catch (err) {
          console.error('Cleanup ảnh dư khi create fail:', err);
        }
      }
      handlePrismaError(error, Entity.PARTNER);
    }
  }

  async update(id: string, data: UpdatePartnerDto) {
    try {
      const exist = await this.prisma.partner.findUnique({
        where: { id },
      });
      if (!exist) {
        throw AppError.NotFound(Entity.PARTNER);
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
            // Quyết định: Bạn có thể tiếp tục update DB dù xóa ảnh thất bại
          }
        }
      }

      // 3. Update đối tác trong DB
      const partner = await this.prisma.partner.update({
        where: { id },
        data,
      });
      return {
        message: 'Cập nhật đối tác thành công',
        data: partner,
      };
    } catch (error) {
      if (data.image?.publicId) {
        try {
          await this.cloudinaryService.deleteFile(data.image?.publicId);
          console.log('Đã xoá ảnh dư khi create fail:', data.image?.publicId);
        } catch (err) {
          console.error('Cleanup ảnh dư khi create fail:', err);
        }
      }
      handlePrismaError(error, Entity.PARTNER);
    }
  }

  async delete(id: string) {
    try {
      const exist = await this.prisma.partner.findUnique({
        where: { id },
        select: {
          image: true,
        },
      });

      if (!exist) {
        throw AppError.NotFound(Entity.PARTNER);
      }

      // 1. Xóa Partner khỏi DB
      const partner = await this.prisma.partner.delete({
        where: { id },
      });

      // 2. Xóa ảnh trên Cloudinary
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
        message: 'Xóa đối tác thành công',
        data: partner,
      };
    } catch (error) {
      handlePrismaError(error, Entity.PARTNER);
    }
  }
}
