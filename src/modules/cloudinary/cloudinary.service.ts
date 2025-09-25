import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { AppError } from 'src/common/exceptions/app-error';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `IQI/${folder}`,
        },
        (error, result) => {
          if (error) {
            return reject(
              AppError.BadRequest(
                typeof error === 'string'
                  ? error
                  : error.message || 'Tải tệp lên thất bại. Vui lòng thử lại.',
              ),
            );
          }

          if (!result) {
            return reject(
              AppError.BadRequest(
                'Tải tệp lên thất bại: Không nhận được phản hồi từ máy chủ.',
              ),
            );
          }

          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  // cloudinary.service.ts
  async deleteFile(publicId: string): Promise<any> {
    if (!publicId) {
      console.warn('Bỏ qua xóa file vì publicId rỗng hoặc không xác định');
      return null; // Không xóa gì cả
    }

    try {
      const result: unknown = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      // Ép kiểu 'error' thành một đối tượng Error
      const errorMessage = (error as Error).message;
      throw AppError.BadRequest(
        // Giờ đây, errorMessage có kiểu là string, nên an toàn
        errorMessage || 'Xóa tệp thất bại. Vui lòng thử lại.',
      );
    }
  }
}
