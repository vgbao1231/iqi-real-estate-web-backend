import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppError } from 'src/common/exceptions/app-error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: TUser,
    info: any,
    _context: ExecutionContext,
    _status?: any,
  ): TUser {
    if (err) {
      if (err instanceof Error) {
        throw AppError.Unauthorized(); // ✅ không lộ message chi tiết
      }
      throw AppError.Unauthorized();
    }

    if (info) {
      if (info instanceof Error) {
        throw AppError.Unauthorized();
      }
      throw AppError.Unauthorized();
    }

    if (!user) {
      throw AppError.Unauthorized();
    }

    return user;
  }
}
