import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

import { JWTPayloadType } from 'src/types/interfaces/payload.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.autorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.req.headers.autorization);
    ctx.token = ctx.req.headers.autorization.split(' ')[1];

    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    const tknRevoked = await this.cacheManager.get(token);
    try {
      if (tknRevoked) {
        throw new HttpException('Token is revoked', HttpStatus.UNAUTHORIZED);
      }
      const userPayload: JWTPayloadType = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as JWTPayloadType;

      const user = await this.usersRepository.findOne(userPayload.id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }
}
