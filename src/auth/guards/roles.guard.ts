import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Cargo } from '../../generated/prisma/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthErrorCode } from 'src/common/enums/auth-error-codes.enum';

export interface RequestWithUser extends Request {
  user: {
    sub: string;
    cargo: Cargo;
    grupoId: string;
  };
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('GUARD EXECUTADO');
    const requiredRoles = this.reflector.getAllAndOverride<Cargo[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('--- 2. Roles do Decorator:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('Roles Requeridas:', requiredRoles);
    console.log('Usuário na Requisição:', user);

    const hasPermission = requiredRoles.includes(user.cargo);

    if (!user || !hasPermission) {
      console.log('Bloqueado: Usuário sem cargo ou não autenticado.');
      throw new ForbiddenException({
        message: 'O cargo do usuário não permite esta ação.',
        errorCode: AuthErrorCode.UNAUTHORIZED_ROLE,
      });
    }

    return true;
  }
}
