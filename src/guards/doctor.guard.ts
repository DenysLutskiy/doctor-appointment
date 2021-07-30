import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from 'src/modules/auth/auth.service';
import { Roles } from 'src/types/enums/user-roles.enum';

@Injectable()
export class DoctorGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.autorization) {
      return false;
    }
    ctx.user = await this.authService.validateToken(
      ctx.req.headers.autorization,
    );

    if (ctx.user.role === Roles.DOCTOR || ctx.user.role === Roles.ADMIN) {
      return true;
    }
    throw new HttpException(
      "You don't have permissions",
      HttpStatus.UNAUTHORIZED,
    );
  }
}
