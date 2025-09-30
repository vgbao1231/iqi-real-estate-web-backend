// article/article.service.ts

import { Injectable } from '@nestjs/common';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { handlePrismaError } from 'src/common/utils/prisma-error.handler';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/CreateArticleDto';
import { UpdateArticleDto } from './dto/UpdateUserDto';

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  private async connectTags(tagNames: string[] | undefined) {
    if (!tagNames || tagNames.length === 0) return undefined;

    const tagConnects = await Promise.all(
      tagNames.map(async (name: string) => {
        const tag = await this.prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name },
        });
        return { tagId: tag.id };
      }),
    );
    return {
      createMany: {
        data: tagConnects.map((t) => ({ tagId: t.tagId })),
        skipDuplicates: true,
      },
    };
  }

  async findAll() {
    try {
      const articles = await this.prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        include: { tags: { include: { tag: true } } },
      });
      return { data: articles };
    } catch (error) {
      handlePrismaError(error, Entity.ARTICLE);
    }
  }

  // --- FIND ONE ---
  async findOne(id: string) {
    try {
      // Tăng view count và trả về bài viết
      const article = await this.prisma.article.update({
        where: { id },
        data: { views: { increment: 1 } },
        include: { tags: { include: { tag: true } } },
      });

      if (!article) {
        throw AppError.NotFound(Entity.ARTICLE);
      }

      return { data: article };
    } catch (error) {
      handlePrismaError(error, Entity.ARTICLE);
    }
  }

  // --- CREATE ---
  async create(userId: string, data: CreateArticleDto) {
    const { tagNames, ...articleData } = data;
    try {
      const articleTags = await this.connectTags(tagNames);

      const article = await this.prisma.article.create({
        data: {
          ...articleData,
          createdBy: userId,
          tags: articleTags,
        },
        include: { tags: { include: { tag: true } } },
      });

      return {
        message: 'Tạo bài viết thành công',
        data: article,
      };
    } catch (error) {
      handlePrismaError(error, Entity.ARTICLE);
    }
  }

  async update(userId: string, id: string, data: UpdateArticleDto) {
    const { tagNames, ...articleData } = data;
    try {
      const existingArticle = await this.prisma.article.findUnique({
        where: { id },
        select: {
          imagePublicId: true,
        },
      });

      if (!existingArticle) {
        throw AppError.NotFound(Entity.ARTICLE);
      }

      const newPublicId = articleData.imagePublicId;
      const oldPublicId = existingArticle.imagePublicId;

      // 1. Logic XÓA ẢNH CŨ TRÊN CLOUDINARY
      if (oldPublicId) {
        // Xóa nếu: 1) Không có Public ID mới (yêu cầu xóa ảnh) HOẶC 2) ID mới khác ID cũ
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

      // Xử lý Tags
      const tagUpdate = tagNames
        ? { deleteMany: {}, ...(await this.connectTags(tagNames)) }
        : undefined;

      // 2. Update bài viết trong DB
      const article = await this.prisma.article.update({
        where: { id },
        data: {
          ...articleData,
          updatedBy: userId,
          tags: tagUpdate,
        },
        include: { tags: { include: { tag: true } } },
      });

      return {
        message: 'Cập nhật bài viết thành công',
        data: article,
      };
    } catch (error) {
      handlePrismaError(error, Entity.ARTICLE);
    }
  }

  async remove(id: string) {
    try {
      const existingArticle = await this.prisma.article.findUnique({
        where: { id },
        select: {
          imagePublicId: true,
        },
      });

      if (!existingArticle) {
        throw AppError.NotFound(Entity.ARTICLE);
      }

      // 1. Xóa Article khỏi DB
      const article = await this.prisma.article.delete({
        where: { id },
      });

      // 2. Xóa ảnh trên Cloudinary
      if (existingArticle.imagePublicId) {
        try {
          await this.cloudinaryService.deleteFile(
            existingArticle.imagePublicId,
          );
        } catch (cloudErr) {
          console.error('Lỗi xóa ảnh trên Cloudinary:', cloudErr);
        }
      }

      return {
        message: 'Xóa bài viết thành công',
        data: article,
      };
    } catch (error) {
      handlePrismaError(error, Entity.ARTICLE);
    }
  }
}
