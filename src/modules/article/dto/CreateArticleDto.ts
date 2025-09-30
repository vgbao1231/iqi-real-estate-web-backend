import { Category } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsOptional()
  @IsString()
  readTime?: string;

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
  @IsArray()
  @IsString({ each: true })
  tagNames?: string[];
}
