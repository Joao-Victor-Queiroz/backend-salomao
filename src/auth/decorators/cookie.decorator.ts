import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookies = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const cookies = request.cookies as Record<string, string | undefined>;

    return data ? cookies[data] : cookies;
  },
);
