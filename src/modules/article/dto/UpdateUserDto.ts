// article/dto/update-article.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { Category } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateArticleDto } from './CreateArticleDto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsOptional()
  @IsString()
  imageUrl?: string | null; // SỬA: imageUrl (chấp nhận null)

  @IsOptional()
  @IsString()
  imagePublicId?: string | null; // SỬA: imagePublicId (chấp nhận null)

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagNames?: string[];
}
