import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsController } from './project.controller';
import { ProjectsService } from './project.service';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, CloudinaryService],
})
export class ProjectsModule {}
