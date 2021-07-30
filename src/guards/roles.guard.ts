import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!roles) {
      return true;
    }
    if (!ctx.req.headers.autorization) {
      return false;
    }

    ctx.user = await this.authService.validateToken(
      ctx.req.headers.autorization,
    );
    const roleMatch = roles.find((role) => role === ctx.user.role);
    if (!roleMatch) {
      throw new HttpException(
        "You don't have permissions",
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
