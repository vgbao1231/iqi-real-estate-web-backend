import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// This should match the user object from your auth strategy
interface UserPayload {
  id: number;
  username: string;
  role: string;
}

export const User = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as UserPayload | undefined;

    if (!user) return undefined;

    // Nếu truyền key thì trả đúng field, nếu không thì trả toàn bộ user
    return data ? user[data] : user;
  },
);
