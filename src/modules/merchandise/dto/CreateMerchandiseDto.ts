import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMerchandiseDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống.' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'Giá sản phẩm phải là một số.' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống.' })
  price: number;

  @IsArray({ message: 'Images phải là một mảng.' })
  images: { url: string; publicId: string }[];
}
