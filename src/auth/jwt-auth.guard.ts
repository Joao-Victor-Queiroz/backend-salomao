import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/is-public.decorator';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  } // a lógica para verificar se é pública vem no guard, a strategy apenas valida o token

  handleRequest(err: any, user: any, info: any): any {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException({
        errorCode: 'TOKEN_EXPIRED',
        message: 'Token expirado',
      });
    }

    if (info instanceof JsonWebTokenError || err || !user) {
      throw new UnauthorizedException({
        errorCode: 'TOKEN_INVALID',
        message: 'Token inválido ou ausente',
      });
    }
    return user;
  }
}
