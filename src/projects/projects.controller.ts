import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Public
  @Get('public')
  findAllPublic() {
    return this.projectsService.findAll({ visibleOnWeb: true });
  }

  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.projectsService.findOne(id, { visibleOnWeb: true });
  }

  // Admin
  @Get()
  @UseGuards(JwtAuthGuard)
  findAllAdmin(@User('role') role: string | undefined) {
    switch (role) {
      case 'ADMIN':
      case 'SALE':
      case 'MARKETING':
        return this.projectsService.findAll();
      default:
        throw new ForbiddenException('Không có quyền truy cập');
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@User('role') role: string | undefined, @Param('id') id: string) {
    switch (role) {
      case 'ADMIN':
        return this.projectsService.findOne(id);
      case 'SALE':
        return this.projectsService.findOne(id);
      case 'MARKETING':
        return this.projectsService.findOne(id);
      default:
        throw new ForbiddenException();
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createDraft(@User('id') userId: string) {
    return this.projectsService.createDraft(userId);
  }

  @Put(':id/:tab')
  @UseGuards(JwtAuthGuard)
  async updateTab(
    @User('id') userId: string,
    @Param('id') projectId: string,
    @Param('tab')
    tab:
      | 'introduction'
      | 'overview'
      | 'location'
      | 'siteplan'
      | 'production'
      | 'amenity'
      | 'timeline'
      | 'contact'
      | 'other',
    @Body() data: { [key: string]: any },
  ) {
    return this.projectsService.updateTab(userId, projectId, tab, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
