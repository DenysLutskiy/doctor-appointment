import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecializationsService } from './specializations.service';
import { SpecializationsResolver } from './specializations.resolver';
import { Specialization } from './entities/specialization.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DoctorsModule,
    TypeOrmModule.forFeature([Specialization]),
  ],
  providers: [SpecializationsResolver, SpecializationsService],
  exports: [SpecializationsService, TypeOrmModule],
})
export class SpecializationsModule {}
