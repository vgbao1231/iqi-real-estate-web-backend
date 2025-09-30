// article/article.module.ts

import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
