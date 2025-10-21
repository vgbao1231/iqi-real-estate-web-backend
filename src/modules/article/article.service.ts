// article/article.service.ts

import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { handlePrismaError } from 'src/common/utils/prisma-error.handler';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/CreateArticleDto';
import { UpdateArticleDto } from './dto/UpdateArticleDto';

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(options: object = {}) {
    try {
      return await this.prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        where: options,
      });
    } catch (error) {
      handlePrismaError(error, Entity.ARTICLE);
    }
  }

  async findOne(id: string, options: object = {}) {
    try {
      const article = await this.prisma.article.update({
        where: { id, ...options },
        data: { views: { increment: 1 } },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!article) {
        throw AppError.NotFound(Entity.ARTICLE);
      }

      return article;
    } catch (error) {
      handlePrismaError(error, Entity.ARTICLE);
    }
  }

  async getRelatedArticles(article: Article) {
    try {
      const tags = article.tags as string[] | null;

      const tagQueries =
        tags && tags.length > 0
          ? tags.slice(0, 3).map((tag) => ({
              tags: {
                has: tag,
              },
            }))
          : [];
      const conditions: Prisma.ArticleWhereInput[] = [];

      if (tagQueries.length > 0) {
        // NHÓM A (Ưu tiên Cao): CÙNG CATEGORY + CHUNG TAGS
        conditions.push({
          AND: [{ category: article.category }, { OR: tagQueries }],
        });

        // NHÓM B (Ưu tiên Thấp): KHÁC CATEGORY + CHUNG TAGS
        conditions.push({
          AND: [{ category: { not: article.category } }, { OR: tagQueries }],
        });
      }

      if (conditions.length === 0) {
        conditions.push({ category: article.category });
      }

      const whereConditions: Prisma.ArticleWhereInput = {
        AND: [
          { id: { not: article.id } }, // Loại trừ chính mình
          { isPublished: true }, // Chỉ lấy bài đã xuất bản
          { OR: conditions }, // Kết hợp các nhóm điều kiện ưu tiên
        ],
      };
      const relatedArticles = await this.prisma.article.findMany({
        where: whereConditions,
        take: 3,
        orderBy: {
          views: 'desc',
        },
        select: {
          id: true,
          category: true,
          type: true,
          title: true,
          image: true,
          createdAt: true,
        },
      });

      return relatedArticles;
    } catch (error) {
      handlePrismaError(error, Entity.PROJECT);
    }
  }

  async create(userId: string, data: CreateArticleDto) {
    try {
      const article = await this.prisma.article.create({
        data: {
          ...data,
          createdBy: userId,
        },
      });

      return {
        message: 'Tạo bài viết thành công',
        data: article,
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
      handlePrismaError(error, Entity.ARTICLE);
    }
  }

  async update(userId: string, id: string, data: UpdateArticleDto) {
    try {
      // 1. Lấy Image Public ID cũ (Từ trường 'image' kiểu Json)
      const exist = await this.prisma.article.findUnique({
        where: { id },
        select: {
          image: true,
        },
      });

      if (!exist) {
        throw AppError.NotFound(Entity.ARTICLE);
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

      // 3. Update bài viết trong DB
      const article = await this.prisma.article.update({
        where: { id },
        data: {
          ...data,
          updatedBy: userId,
        },
      });

      return {
        message: 'Cập nhật bài viết thành công',
        data: article,
      };
    } catch (error) {
      if (data.image?.publicId) {
        try {
          await this.cloudinaryService.deleteFile(data.image?.publicId);
          console.log('Đã xoá ảnh dư khi update fail:', data.image?.publicId);
        } catch (err) {
          console.error('Cleanup ảnh dư khi update fail:', err);
        }
      }
      handlePrismaError(error, Entity.ARTICLE);
    }
  }

  async delete(id: string) {
    try {
      const exist = await this.prisma.article.findUnique({
        where: { id },
        select: {
          image: true,
        },
      });

      if (!exist) {
        throw AppError.NotFound(Entity.ARTICLE);
      }

      // 1. Xóa Article khỏi DB
      const article = await this.prisma.article.delete({
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
        message: 'Xóa bài viết thành công',
        data: article,
      };
    } catch (error) {
      handlePrismaError(error, Entity.ARTICLE);
    }
  }
}
