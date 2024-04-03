import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return false;
    }
    const [, token] = authorizationHeader.split(' ');

    try {
      const secretKey = this.configService.get<string>('JWT_SECRET');
      const decoded = jwt.verify(token, secretKey);
      const decodedToken = decoded as jwt.JwtPayload;
      const userRol = decodedToken.role;
      const hasRequiredRole = requiredRoles.includes(userRol);
      return hasRequiredRole;
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }
}
