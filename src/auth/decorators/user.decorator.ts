import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../guards/roles.guard';
import { UsuarioSemSenha } from '../jwt.strategy';

export const GetUser = createParamDecorator(
  (data: keyof UsuarioSemSenha | undefined, ctx: ExecutionContext) => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
