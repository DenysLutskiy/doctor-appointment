import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HospitalsModule } from 'src/modules/hospitals/hospitals.module';
import { SpecializationsModule } from 'src/modules/specializations/specializations.module';
import { DoctorsModule } from 'src/modules/doctors/doctors.module';
import { RoomsModule } from 'src/modules/rooms/rooms.module';
import { PatientsModule } from './modules/patients/patients.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        playground: true,
        typePaths: ['./**/*.graphql'],
      }),
    }),
    UsersModule,
    AuthModule,
    HospitalsModule,
    SpecializationsModule,
    DoctorsModule,
    RoomsModule,
    PatientsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
