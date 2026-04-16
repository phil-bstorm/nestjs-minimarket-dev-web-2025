import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { RequestSession, Session } from 'src/intefaces/session.interface';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly _jwtService: JwtService) {}

  use(req: RequestSession, res: Response, next: NextFunction) {
    // aller chercher le BearerToken
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      // l'utilisateur n'est pas connecté
      next();
      return;
    }

    // Extraire le type et la token  "bearer eyJhbGciOiJ..."
    const [type, token] = bearerToken.split(' ');

    // vérifier que le type "Bearer"
    if (type.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Invalid type token');
    }

    // vérifier le token
    try {
      const session = this._jwtService.verify<Session>(token);
      req.session = session;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
