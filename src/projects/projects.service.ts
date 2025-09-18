import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Project } from '@prisma/client';
import { DEFAULT_PROJECT } from 'src/common/constants/default-project';
import { PrismaService } from 'src/prisma/prisma.service';

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

  constructor(private prisma: PrismaService) {}

  async findAll(options: object = {}) {
    return this.prisma.project.findMany({
      where: options,
      orderBy: { createdAt: 'desc' },
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
      throw new BadRequestException(`Tab "${tab}" không hợp lệ`);
    }

    const project = await this.prisma.project.findUnique({
      where: { id, ...options },
      select: { [tab]: true },
    });

    if (!project) {
      throw new NotFoundException(`Dự án không tồn tại`);
    }

    return project[tab]; // trả về JSON của tab
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
    } catch {
      throw new Error('Thêm dự án thất bại');
    }
  }

  async updateTab(
    userId: string,
    id: string,
    tab: TabKey,
    data: { [key: string]: any },
  ) {
    function setDeep(obj: Record<string, any>, path: string, value: any) {
      const parts = path
        .replace(/\]/g, '') // bỏ dấu ]
        .split(/\[|\./); // tách theo [ hoặc .

      let current: Record<string, any> = obj;
      parts.forEach((part, idx) => {
        const isLast = idx === parts.length - 1;
        const nextPart = parts[idx + 1];
        const isArray = /^\d+$/.test(nextPart); // nếu key tiếp theo là số → mảng

        if (isLast) {
          // Assign value as unknown to avoid unsafe any assignment
          current[part] = value as unknown;
        } else {
          if (!(part in current)) {
            current[part] = isArray ? [] : {};
          }
          current = current[part] as Record<string, any>;
        }
      });
    }

    // validate tab
    if (!this.validTabs.includes(tab)) {
      throw new BadRequestException(`Invalid tab name: ${tab}`);
    }

    // check project exist
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!project) {
      throw new NotFoundException(`Dự án không tồn tại`);
    }

    // parse body
    const jsonDataToSave: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      try {
        if (typeof value === 'string') {
          setDeep(jsonDataToSave, key, JSON.parse(value));
        } else {
          setDeep(jsonDataToSave, key, value);
        }
      } catch {
        setDeep(jsonDataToSave, key, value);
      }
    }

    // save
    return this.prisma.project.update({
      where: { id },
      data: {
        [tab]: jsonDataToSave,
        updatedBy: userId,
      },
    });
  }

  async deleteProject(id: string) {
    const existing = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!existing) throw new NotFoundException(`Dự án không tồn tại`);

    await this.prisma.project.delete({ where: { id: id } });

    return {
      message: `Xóa dự án thành công`,
      deletedId: id,
    };
  }
}
