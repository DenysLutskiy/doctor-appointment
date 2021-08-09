import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HospitalsService } from './hospitals.service';
import { HospitalsResolver } from './hospitals.resolver';
import { Hospital } from './entities/hospital.entity';
import * as REDIS_CONFIG from 'src/config/redis';

@Module({
  imports: [
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Hospital]),
  ],
  providers: [HospitalsResolver, HospitalsService],
  exports: [HospitalsService, TypeOrmModule],
})
export class HospitalsModule {}
