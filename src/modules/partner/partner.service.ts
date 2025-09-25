import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePartnerDto } from './dto/UpdatePartnerDto';

@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}

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

  async create(data: Prisma.PartnerCreateInput) {
    const partner = await this.prisma.partner.create({ data });
    return {
      partner,
      message: 'Thêm đối tác thành công',
    };
  }

  async update(id: string, data: UpdatePartnerDto) {
    try {
      const exist = await this.prisma.partner.findUnique({ where: { id } });
      if (!exist) {
        throw AppError.NotFound(Entity.PARTNER);
      }
      const partner = await this.prisma.partner.update({
        where: { id },
        data,
      });
      return {
        message: 'Cập nhật đối tác thành công',
        data: partner,
      };
    } catch (error) {
      console.error('Update partner error:', error);
      throw AppError.BadRequest('Cập nhật đối tác thất bại');
    }
  }

  async delete(id: string) {
    try {
      const exist = await this.prisma.partner.findUnique({ where: { id } });
      if (!exist) {
        throw AppError.NotFound(Entity.PARTNER);
      }
      await this.prisma.partner.delete({ where: { id } });
      return { message: 'Partner deleted successfully' };
    } catch (error) {
      console.error('Delete project error:', error);
      throw AppError.BadRequest('Xóa đối tác thất bại');
    }
  }
}
