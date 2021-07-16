import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as REDIS_CONFIG from 'src/config/redis';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersResolver, UsersService, AuthService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
