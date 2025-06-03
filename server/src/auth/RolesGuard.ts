import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from 'src/users/role';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has the admin role
    return user && user.role === Role.admin;
  }
}
