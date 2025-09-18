import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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
        throw new UnauthorizedException(err.message);
      }
      throw new UnauthorizedException('Unauthorized');
    }

    if (info) {
      if (info instanceof Error) {
        throw new UnauthorizedException(info.message);
      }
      throw new UnauthorizedException('Unauthorized');
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
