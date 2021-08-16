import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecializationsService } from './specializations.service';
import { SpecializationsResolver } from './specializations.resolver';
import { Specialization } from './entities/specialization.entity';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [
    forwardRef(() => DoctorsModule),
    TypeOrmModule.forFeature([Specialization]),
  ],
  providers: [SpecializationsResolver, SpecializationsService],
  exports: [SpecializationsService, TypeOrmModule],
})
export class SpecializationsModule {}
