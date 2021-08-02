import { Module } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { SpecializationsResolver } from './specializations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialization } from './entities/specialization.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Specialization])],
  providers: [SpecializationsResolver, SpecializationsService],
  exports: [SpecializationsService, TypeOrmModule],
})
export class SpecializationsModule {}
