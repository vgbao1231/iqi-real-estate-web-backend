import { ArticleCategory, ArticleType } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNotEmpty({ message: 'Loại bài viết không được để trống' })
  type: ArticleType;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  category: ArticleCategory;

  @IsOptional()
  @IsString()
  readTime?: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  image?: { url: string; publicId: string };

  @IsOptional()
  tags?: any;
}
