import { CacheModule, Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsResolver } from './hospitals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entities/hospital.entity';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
import * as REDIS_CONFIG from 'src/config/redis';

@Module({
  imports: [
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Hospital, User]),
  ],
  providers: [HospitalsResolver, HospitalsService, AuthService],
})
export class HospitalsModule {}
