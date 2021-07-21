import { Module } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { SpecializationsResolver } from './specializations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialization } from './entities/specialization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialization])],
  providers: [SpecializationsResolver, SpecializationsService],
})
export class SpecializationsModule {}
