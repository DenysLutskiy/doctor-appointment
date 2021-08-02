import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { Room } from './entities/room.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { DoctorsModule } from 'src/modules/doctors/doctors.module';
import { SpecializationsModule } from 'src/modules/specializations/specializations.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import * as REDIS_CONFIG from 'src/config/redis';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    forwardRef(() => DoctorsModule),
    forwardRef(() => SpecializationsModule),
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Room]),
  ],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService, TypeOrmModule],
})
export class RoomsModule {}
