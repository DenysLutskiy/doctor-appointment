import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { Room } from './entities/room.entity';
import { DoctorsModule } from 'src/modules/doctors/doctors.module';
import * as REDIS_CONFIG from 'src/config/redis';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [
    forwardRef(() => DoctorsModule),
    AppointmentsModule,
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Room]),
  ],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService, TypeOrmModule],
})
export class RoomsModule {}
