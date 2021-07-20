import { CacheModule, Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialization } from 'src/specializations/entities/specialization.entity';
import { User } from 'src/users/entities/user.entity';
import { Doctor } from './entities/doctor.entity';
import { UsersService } from 'src/users/users.service';
import { SpecializationsService } from 'src/specializations/specializations.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    CacheModule.register(REDIS_CONFIG),
    TypeOrmModule.forFeature([Doctor, User, Specialization]),
  ],
  providers: [
    DoctorsResolver,
    DoctorsService,
    UsersService,
    SpecializationsService,
    AuthService,
  ],
})
export class DoctorsModule {}
function REDIS_CONFIG(
  REDIS_CONFIG: any,
):
  | import('@nestjs/common').Type<any>
  | import('@nestjs/common').DynamicModule
  | Promise<import('@nestjs/common').DynamicModule>
  | import('@nestjs/common').ForwardReference<any> {
  throw new Error('Function not implemented.');
}
