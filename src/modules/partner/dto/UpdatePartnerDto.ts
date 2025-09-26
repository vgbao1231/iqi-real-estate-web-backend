import { PartnerCategory } from '@prisma/client';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdatePartnerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  category?: PartnerCategory;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  countryCount?: number;

  @IsOptional()
  @IsNumber()
  agentCount?: number;

  @IsOptional()
  @IsNumber()
  partnershipYear?: number;

  @IsOptional()
  specialties?: any;

  @IsOptional()
  achievements?: any;

  @IsOptional()
  @IsUrl({}, { message: 'logoUrl phải là URL hợp lệ' })
  logoUrl?: string;
}
