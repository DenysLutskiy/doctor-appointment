import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { Room } from './entities/room.entity';
import { AuthService } from 'src/auth/auth.service';
import * as REDIS_CONFIG from 'src/config/redis';
import { User } from 'src/users/entities/user.entity';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Specialization } from 'src/specializations/entities/specialization.entity';

@Module({
  imports: [
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Room, User, Doctor, Specialization]),
  ],
  providers: [RoomsResolver, RoomsService, AuthService, DoctorsService],
})
export class RoomsModule {}
