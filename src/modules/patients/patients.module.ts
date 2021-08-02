import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientsService } from './patients.service';
import { PatientsResolver } from './patients.resolver';
import { Patient } from './entities/patient.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Patient])],
  providers: [PatientsResolver, PatientsService],
  exports: [PatientsService, TypeOrmModule],
})
export class PatientsModule {}
