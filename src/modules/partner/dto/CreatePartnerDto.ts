import { PartnerCategory } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePartnerDto {
  @IsNotEmpty({ message: 'Tên đối tác không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  @IsEnum(PartnerCategory, { message: 'Danh mục không hợp lệ' })
  category: PartnerCategory;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt({ message: 'Số lượng quốc gia phải là số nguyên' })
  @IsNumber()
  countryCount?: number;

  @IsOptional()
  @IsInt({ message: 'Số lượng đại lý phải là số nguyên' })
  @IsNumber()
  agentCount?: number;

  @IsOptional()
  @IsInt({ message: 'Số lượng dự án phải là số nguyên' })
  @IsNumber()
  projectCount?: number;

  @IsOptional()
  @IsInt({ message: 'Năm hợp tác phải là số nguyên' })
  @IsNumber()
  partnershipYear?: number;

  @IsOptional()
  specialties?: string[];

  @IsOptional()
  achievements?: string[];
  @IsOptional()
  benefits?: string[];

  @IsOptional()
  image?: { url: string; publicId: string };

  @IsOptional()
  @IsString()
  loanRate?: string;

  @IsOptional()
  @IsString()
  maxLoan?: string;

  @IsOptional()
  @IsString()
  revenue?: string;
}
