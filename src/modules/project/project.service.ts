import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { DEFAULT_PROJECT } from 'src/common/constants/default-project';
import { Entity } from 'src/common/enums/entity';
import { AppError } from 'src/common/exceptions/app-error';
import { collectPublicIds, safeParse } from 'src/common/utils/helper';
import { handlePrismaError } from 'src/common/utils/prisma-error.handler';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

// Tạo một Type an toàn cho tên các tab, lấy trực tiếp từ Prisma Model
// Điều này giúp code không bị lỗi chính tả và dễ bảo trì hơn
type TabKey = keyof Omit<
  Project,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'creator'
  | 'updater'
>;

@Injectable()
export class ProjectsService {
  // Danh sách các tab hợp lệ để kiểm tra đầu vào
  private readonly validTabs: TabKey[] = [
    'introduction',
    'overview',
    'location',
    'siteplan',
    'production',
    'amenity',
    'timeline',
    'contact',
    'other',
  ];

  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(options: object = {}) {
    return this.prisma.project.findMany({
      where: options,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        isFeatured: false,
        isExclusive: false,
        visibleOnWeb: false,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
        updatedBy: true,
        introduction: true,
        overview: true,
      },
    });
  }

  async findOne(id: string, options: object = {}) {
    return this.prisma.project.findFirst({
      where: {
        id,
        ...options,
      },
    });
  }

  async getTabById(id: string, tab: TabKey, options: object = {}) {
    // Kiểm tra tab hợp lệ
    if (!this.validTabs.includes(tab)) {
      throw AppError.BadRequest(`Tab "${tab}" không hợp lệ`);
    }

    const project = await this.prisma.project.findUnique({
      where: { id, ...options },
      select: { [tab]: true },
    });

    if (!project) {
      throw AppError.NotFound(Entity.PROJECT);
    }

    return project[tab];
  }

  async createDraft(userId: string) {
    try {
      const project = await this.prisma.project.create({
        data: {
          createdBy: userId,
          ...DEFAULT_PROJECT,
        },
        select: { id: true },
      });

      return {
        project,
        message: 'Thêm dự án thành công',
      };
    } catch (error) {
      // Có thể log lại để debug
      console.error('Create draft project error:', error);
      throw AppError.BadRequest('Thêm dự án thất bại'); // ✅ đồng bộ AppError
    }
  }

  async updateTab(
    userId: string,
    id: string,
    tab: TabKey,
    data: Record<string, any>,
  ) {
    // helper: set deep path
    function setDeep(obj: Record<string, any>, path: string, value: any) {
      const parts = path.replace(/\]/g, '').split(/\[|\./);
      parts.reduce((acc, part, idx) => {
        const isLast = idx === parts.length - 1;
        if (isLast) {
          acc[part] = value as unknown;
        } else {
          acc[part] ??= /^\d+$/.test(parts[idx + 1]) ? [] : {};
        }
        return acc[part] as Record<string, any>;
      }, obj);
    }

    // ✅ validate tab
    if (!this.validTabs.includes(tab)) {
      throw AppError.BadRequest(`Invalid tab name: ${tab}`);
    }

    // ✅ check project tồn tại và lấy data cũ
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: { id: true, [tab]: true },
    });
    if (!project) throw AppError.NotFound(Entity.PROJECT);

    // ✅ parse body mới
    const jsonDataToSave: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      setDeep(jsonDataToSave, key, safeParse(value));
    }

    // ✅ so sánh ảnh cũ/mới để tìm ảnh cần xóa
    const oldPublicIds = collectPublicIds(project[tab]);
    const newPublicIds = collectPublicIds(jsonDataToSave);
    const toDelete = oldPublicIds.filter((id) => !newPublicIds.includes(id));

    // ✅ update DB
    try {
      const updated = await this.prisma.project.update({
        where: { id },
        data: {
          [tab]: jsonDataToSave,
          updatedBy: userId,
        },
      });

      // ✅ xóa ảnh cũ sau khi update thành công
      if (toDelete.length > 0) {
        for (const publicId of toDelete) {
          try {
            await this.cloudinaryService.deleteFile(publicId);
            console.log(`🗑️ Deleted old image: ${publicId}`);
          } catch (err) {
            console.error(`❌ Failed to delete image ${publicId}`, err);
          }
        }
      }

      return {
        data: updated,
        message: 'Cập nhật tab dự án thành công',
      };
    } catch (error) {
      handlePrismaError(error, Entity.PROJECT);
    }
  }

  async deleteProject(id: string) {
    // 1. Check tồn tại
    const existing = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!existing) {
      throw AppError.NotFound(Entity.PROJECT);
    }

    // 2. Thu thập tất cả publicId từ các tab
    const publicIds: string[] = [];
    for (const value of Object.values(existing)) {
      collectPublicIds(value, publicIds);
    }

    try {
      // 3. Xóa ảnh trên Cloudinary trước
      if (publicIds.length > 0) {
        for (const pid of publicIds) {
          try {
            await this.cloudinaryService.deleteFile(pid);
            console.log(`🗑️ Deleted image: ${pid}`);
          } catch (err) {
            console.error(`❌ Failed to delete image ${pid}`, err);
          }
        }
      }

      // 4. Xóa dự án trong DB
      await this.prisma.project.delete({ where: { id } });

      return {
        message: 'Xóa dự án thành công',
        deletedId: id,
      };
    } catch (error) {
      console.error('Delete project error:', error);
      throw AppError.BadRequest('Xóa dự án thất bại');
    }
  }
}
