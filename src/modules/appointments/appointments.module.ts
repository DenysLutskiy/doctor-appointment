import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { Appointment } from './entities/appointment.entity';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
import { RoomsModule } from '../rooms/rooms.module';
import { ScheduledAppointmentResolver } from './scheduled-appointment.resolver';

@Module({
  imports: [
    forwardRef(() => DoctorsModule),
    forwardRef(() => RoomsModule),
    PatientsModule,
    TypeOrmModule.forFeature([Appointment]),
  ],
  providers: [
    AppointmentsResolver,
    ScheduledAppointmentResolver,
    AppointmentsService,
  ],
  exports: [AppointmentsService, TypeOrmModule],
})
export class AppointmentsModule {}
