import { Prisma } from '@prisma/client';
import { Entity } from '../enums/entity';
import { ErrorCode } from '../enums/error-code';
import { AppError } from '../exceptions/app-error';

export function handlePrismaError(
  error: unknown,
  entity: Entity = Entity.USER,
) {
  // ❌ Lỗi request đã biết (KnownRequestError)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      // Duplicate unique constraint
      case 'P2002': {
        const target = error.meta?.target;

        let fields: string[] = [];

        if (Array.isArray(target)) {
          fields = target as string[];
        } else if (typeof target === 'string') {
          const match = target.match(/_(\w+)_key$/);
          fields = match ? [match[1]] : [target];
        }

        const uniqueMessages: Record<string, string> = {
          email: 'Email đã tồn tại',
          phone: 'Số điện thoại đã tồn tại',
          // username: 'Tên đăng nhập đã tồn tại',
          // citizenId: 'CMND/CCCD đã tồn tại',
        };

        const messages = fields.map(
          (field) => uniqueMessages[field] || `${field} đã tồn tại`,
        );

        throw AppError.BadRequest(
          messages.length === 1 ? messages[0] : messages,
        );
      }

      // Foreign key constraint failed (quan hệ còn dữ liệu liên quan)
      case 'P2003':
        throw AppError.BadRequest(
          `Không thể xóa ${entity} vì đang có dữ liệu liên quan.`,
          ErrorCode.RELATION_CONFLICT,
        );

      // Record not found
      case 'P2025':
        throw AppError.NotFound(entity);

      default:
        throw AppError.BadRequest(
          `Prisma error ${error.code}: ${error.message || 'Lỗi hệ thống'}`,
        );
    }
  }

  // ❌ Lỗi validation (thiếu field, sai type,…)
  if (error instanceof Prisma.PrismaClientValidationError) {
    throw AppError.BadRequest(
      'Thiếu hoặc sai dữ liệu khi thao tác với cơ sở dữ liệu',
      ErrorCode.VALIDATION_ERROR,
    );
  }

  // ❌ Default: fallback
  throw AppError.BadRequest(
    error instanceof Error ? error.message : 'Lỗi hệ thống',
  );
}
