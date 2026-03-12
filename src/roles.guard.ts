import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Cargo } from './generated/prisma/enums';
import { ROLES_KEY } from './roles.decorator';

interface RequestWithUser extends Request {
  user: {
    sub: string;
    cargo: Cargo;
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

    if (!user || !user.cargo) {
      console.log('Bloqueado: Usuário sem cargo ou não autenticado.');
      return false;
    }

    return user && user.cargo && requiredRoles.includes(user.cargo);
  }
}
