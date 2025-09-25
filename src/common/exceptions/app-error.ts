// app-error.ts
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCode } from '../enums/error-code';

export class AppError {
  // --- NOT FOUND ---
  static NotFound(message = 'Resource không tồn tại') {
    return new NotFoundException({
      code: ErrorCode.NOT_FOUND,
      message,
    });
  }

  // --- BAD REQUEST ---
  static BadRequest(
    message: string | string[],
    code: ErrorCode = ErrorCode.BAD_REQUEST,
  ) {
    return new BadRequestException({ code, message });
  }

  // --- UNAUTHORIZED ---
  static Unauthorized(message = 'Chưa xác thực') {
    return new UnauthorizedException({
      code: ErrorCode.UNAUTHORIZED,
      message,
    });
  }

  // --- FORBIDDEN ---
  static Forbidden(message = 'Không có quyền truy cập') {
    return new ForbiddenException({
      code: ErrorCode.FORBIDDEN,
      message,
    });
  }
}
