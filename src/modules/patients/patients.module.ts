import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientsService } from './patients.service';
import { PatientsResolver } from './patients.resolver';
import { Patient } from './entities/patient.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forFeature([Patient])],
  providers: [PatientsResolver, PatientsService],
  exports: [PatientsService, TypeOrmModule],
})
export class PatientsModule {}
