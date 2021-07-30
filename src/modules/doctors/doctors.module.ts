import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { Doctor } from './entities/doctor.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { SpecializationsModule } from 'src/modules/specializations/specializations.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import * as REDIS_CONFIG from 'src/config/redis';
import { RoomsService } from '../rooms/rooms.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { Room } from '../rooms/entities/room.entity';
import { Appointment } from '../appointments/entities/appointment.entity';

@Module({
  imports: [
    UsersModule,
    SpecializationsModule,
    AuthModule,
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Doctor, Room, Appointment]),
  ],
  providers: [
    DoctorsResolver,
    DoctorsService,
    RoomsService,
    AppointmentsService,
  ],
  exports: [DoctorsService, TypeOrmModule],
})
export class DoctorsModule {}
