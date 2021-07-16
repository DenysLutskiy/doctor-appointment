import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/types/enums/user-roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.autorization) {
      return false;
    }
    ctx.user = await this.authService.validateToken(
      ctx.req.headers.autorization,
    );

    if (ctx.user.role !== Roles.ADMIN) {
      throw new HttpException(
        "You don't have permissions",
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}
