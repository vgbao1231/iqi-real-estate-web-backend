// upload.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  providers: [CloudinaryService],
})
export class UploadModule {}
