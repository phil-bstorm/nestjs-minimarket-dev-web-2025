import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/enums/user-role.enum';
import { RequestSession } from 'src/interfaces/session.interface';

@Injectable()
export class RequireRoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this._reflector.get<UserRole[]>(
      'require-role',
      context.getHandler(),
    );

    // On vérifie si l'utilisateur est connecté
    const request: RequestSession = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session) {
      return false;
    }

    // On vérifie si l'utilisateur a besoin de rôle
    if (!roles || roles.length === 0) {
      return true;
    }

    // si il a besoin de role:
    // on vérifie s'il possède bien UN des rôles demandés
    if (roles.includes(session.role)) {
      return true;
    }

    return false;
  }
}
