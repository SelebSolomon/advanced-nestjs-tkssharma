import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from '../decorators/role-allowed';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the roles required for this route
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are set on the route, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Get the request object
    const request = context.switchToHttp().getRequest<Request>();
    const hasRole = requiredRoles.some((role) => request.roles?.includes(role));
    return hasRole;
  }
}

// function validateRequest(request: any): boolean {
//   // Add your authentication logic here
//   // For example, check for a valid JWT token in the Authorization header
//   const authHeader = request.headers['authorization'];
//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.split(' ')[1];
//     // Validate the token (this is just a placeholder, implement your own logic)
//     if (token === 'valid-token') {
//       return true;
//     }
//   }
//   return false;
