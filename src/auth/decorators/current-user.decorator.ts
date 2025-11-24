import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUserData {
  userId: string;
  email: string;
  username: string;
}

interface RequestWithUser extends Request {
  user?: CurrentUserData;
}

/**
 * Decorador custom para obtener info del usuario logueado desde el JWT.
 * Seguro, tipado y sin warnings de ESLint.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CurrentUserData | null => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return request.user ?? null;
  },
);
