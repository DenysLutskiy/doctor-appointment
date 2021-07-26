import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecializationsService } from './specializations.service';
import { SpecializationsResolver } from './specializations.resolver';
import { Specialization } from './entities/specialization.entity';
import { AuthModule } from '../auth/auth.module';
import { DoctorsService } from '../doctors/doctors.service';
import { Doctor } from '../doctors/entities/doctor.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([Specialization, Doctor]),
  ],
  providers: [SpecializationsResolver, SpecializationsService, DoctorsService],
  exports: [SpecializationsService, TypeOrmModule],
})
export class SpecializationsModule {}
