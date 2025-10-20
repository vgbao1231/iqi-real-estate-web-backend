import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertContactDto {
  @IsNotEmpty({ message: 'Hotline chính không được để trống' })
  @IsString()
  mainHotline: string;

  @IsNotEmpty({ message: 'Email chính không được để trống' })
  @IsEmail({}, { message: 'Email chính không hợp lệ' })
  mainEmail: string;

  @IsNotEmpty({ message: 'Website không được để trống' })
  @IsString()
  website: string;

  @IsNotEmpty({ message: 'Địa chỉ chính không được để trống' })
  @IsString()
  mainAddress: string;

  @IsOptional()
  @IsString()
  workingHours?: string;

  @IsOptional()
  socialMedia?: { id: string; platform: string; url: string }[];
}
