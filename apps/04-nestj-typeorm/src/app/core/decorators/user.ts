import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // Treat request.user as any for simplicity
    const request = ctx.switchToHttp().getRequest<{ user?: any }>();
    const user = request.user;

    // If a key is provided, return that property
    return data ? user?.[data] : user;
  },
);
