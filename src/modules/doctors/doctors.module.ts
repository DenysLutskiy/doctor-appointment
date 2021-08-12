import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { Doctor } from './entities/doctor.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { SpecializationsModule } from 'src/modules/specializations/specializations.module';
import * as REDIS_CONFIG from 'src/config/redis';
import { RoomsModule } from '../rooms/rooms.module';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => SpecializationsModule),
    forwardRef(() => RoomsModule),
    AppointmentsModule,
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Doctor]),
  ],
  providers: [DoctorsResolver, DoctorsService],
  exports: [DoctorsService, TypeOrmModule],
})
export class DoctorsModule {}
