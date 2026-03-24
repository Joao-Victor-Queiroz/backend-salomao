import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../guards/roles.guard';
import { Payload } from '../jwt.strategy';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    const user = request.user as Payload;

    return data ? user?.[data as keyof typeof user] : user;
  },
);
