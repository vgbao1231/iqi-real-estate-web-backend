import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder: string,
  ) {
    const result = await this.cloudinaryService.uploadFile(file, folder);
    return { url: result.secure_url, publicId: result.public_id };
  }

  @Delete('image')
  @UseGuards(JwtAuthGuard)
  async deleteImage(@Body('publicId') publicId: string) {
    const result: unknown = await this.cloudinaryService.deleteFile(publicId);
    return result;
  }
}
