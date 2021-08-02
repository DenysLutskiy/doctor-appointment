import { HttpStatus, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HospitalsModule } from 'src/modules/hospitals/hospitals.module';
import { SpecializationsModule } from 'src/modules/specializations/specializations.module';
import { DoctorsModule } from 'src/modules/doctors/doctors.module';
import { RoomsModule } from 'src/modules/rooms/rooms.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ApolloError } from 'apollo-server-express';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
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
        formatError: (error: GraphQLError): GraphQLFormattedError => {
          if (error instanceof ApolloError) {
            const exceptionFilter = new HttpExceptionFilter();
            return exceptionFilter.catch(error, null);
          }

          const errorId = error.extensions.errorId;
          const code = error.message;

          return new GraphQLError(
            `${typeof code === 'number' ? HttpStatus[`${code}`] : code}`,
            null,
            null,
            null,
            null,
            null,
            { errorId },
          );
        },
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
