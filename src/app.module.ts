import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { SpecializationsModule } from './specializations/specializations.module';

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
  ],
})
export class AppModule {}
