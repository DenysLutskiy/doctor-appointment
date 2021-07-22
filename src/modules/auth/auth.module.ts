import { CacheModule, Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import * as REDIS_CONFIG from 'src/config/redis';

@Module({
  imports: [UsersModule, CacheModule.register(REDIS_CONFIG)],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
