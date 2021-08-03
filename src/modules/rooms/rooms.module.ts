import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { Room } from './entities/room.entity';
import * as REDIS_CONFIG from 'src/config/redis';
import { AppointmentsModule } from '../appointments/appointments.module';
import { Doctor } from '../doctors/entities/doctor.entity';
import { DoctorsService } from '../doctors/doctors.service';
import { UsersModule } from '../users/users.module';
import { SpecializationsModule } from '../specializations/specializations.module';
import { RestrictedRoomResolver } from 'src/types/unions/restristed-rooms.union';

@Module({
  imports: [
    // forwardRef(() => DoctorsModule),
    UsersModule,
    forwardRef(() => SpecializationsModule),
    AppointmentsModule,
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Room, Doctor]),
  ],
  providers: [
    RoomsResolver,
    RoomsService,
    DoctorsService,
    RestrictedRoomResolver,
  ],
  exports: [RoomsService, TypeOrmModule],
})
export class RoomsModule {}
