import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { Room } from './entities/room.entity';
import { UsersModule } from 'src/users/users.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { SpecializationsModule } from 'src/specializations/specializations.module';
import { AuthModule } from 'src/auth/auth.module';
import * as REDIS_CONFIG from 'src/config/redis';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DoctorsModule,
    SpecializationsModule,
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Room]),
  ],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService, TypeOrmModule],
})
export class RoomsModule {}
