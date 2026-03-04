import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Animador } from 'src/generated/prisma/client';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: Animador }>();

    return request.user;
  },
);
