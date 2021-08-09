import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import * as REDIS_CONFIG from 'src/config/redis';
import { RolesInfoResolver } from 'src/types/unions/roles-info.union';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [
    // forwardRef(() => DoctorsModule),
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
