import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'projects', // Tùy chọn: lưu vào một thư mục trên Cloudinary
        },
        (error, result) => {
          if (error)
            return reject(
              new Error(
                typeof error === 'string'
                  ? error
                  : error.message || 'Upload failed',
              ),
            );
          if (!result) {
            return reject(new Error('Upload failed: result is undefined'));
          }
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
