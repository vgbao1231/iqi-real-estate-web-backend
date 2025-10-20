import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { handlePrismaError } from 'src/common/utils/prisma-error.handler';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertContactDto } from './dto/UpsertContactDto ';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async findOne() {
    const contact = await this.prisma.contact.findFirst();

    if (!contact) {
      throw AppError.NotFound(Entity.CONTACT);
    }
    return contact;
  }

  async upsert(data: UpsertContactDto) {
    try {
      const exist = await this.prisma.contact.findFirst({
        select: { id: true },
      });
      const contact = await this.prisma.contact.upsert({
        where: { id: exist?.id },
        update: data,
        create: {
          id: randomUUID(),
          ...data,
        },
      });

      return {
        message: 'Cập nhật thông tin liên hệ thành công',
        data: contact,
      };
    } catch (error) {
      // Xử lý lỗi Prisma chung
      handlePrismaError(error, Entity.CONTACT);
    }
  }
}
