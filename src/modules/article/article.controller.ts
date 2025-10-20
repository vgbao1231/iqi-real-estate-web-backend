// article/article.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Article } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/CreateArticleDto';
import { UpdateArticleDto } from './dto/UpdateArticleDto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Public
  @Get('public')
  async findAllPublic() {
    const articles = await this.articleService.findAll({ isPublished: true });
    // const featuredProjects = await this.articleService.getfeaturedProjects();
    // return { articles, featuredProjects };
    return { articles };
  }

  @Get('public/:id')
  async findOnePublic(@Param('id') id: string) {
    const article = await this.articleService.findOne(id, {
      isPublished: true,
    });
    const relatedArticles = await this.articleService.getRelatedArticles(
      article as Article,
    );
    return { article, relatedArticles };
  }

  // Admin
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @User('id') userId: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articleService.create(userId, createArticleDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @User('id') userId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(userId, id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
