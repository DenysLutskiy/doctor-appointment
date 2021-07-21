import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.autorization) {
      return false;
    }
    ctx.user = await this.authService.validateToken(
      ctx.req.headers.autorization,
    );
    ctx.token = ctx.req.headers.autorization.split(' ')[1];

    return true;
  }
}
