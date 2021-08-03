import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { AppointmentsService } from './appointments.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Appointment } from './entities/appointment.entity';
import { Room } from '../rooms/entities/room.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';
import { RoomsService } from '../rooms/rooms.service';
import { CanPass } from 'src/utils/canpass.decorator';
import { Roles } from 'src/types/enums/user-roles.enum';
import { EditAppointmentInput } from './dto/edit-appointment.input';
import { ScheduledAppointment } from './entities/scheduled-appointment.entity';

@Resolver('Appointment')
export class AppointmentsResolver {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientsService,
    private readonly roomsService: RoomsService,
  ) {}

  @Mutation('createAppointment')
  @CanPass(Roles.ADMIN, Roles.DOCTOR)
  create(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentInput);
  }

  @Mutation('editAppointment')
  @CanPass(Roles.ADMIN, Roles.DOCTOR)
  edit(
    @Args('appointmentId')
    appointmentId: string,
    @Args('editAppointmentInput')
    editAppointmentInput: EditAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.edit(appointmentId, editAppointmentInput);
  }

  @Mutation('cancelAppointment')
  @CanPass(Roles.ADMIN, Roles.DOCTOR)
  cancel(
    @Args('appointmentId')
    appointmentId: string,
  ): Promise<boolean> {
    return this.appointmentsService.cancel(appointmentId);
  }

  @Query('appointments')
  findAll(
    @Args('filter')
    filter: string,
    @Args('patientId')
    patientId: string,
    @Args('doctorId')
    doctorId: string,
  ): Promise<ScheduledAppointment[]> {
    return this.appointmentsService.findAll(filter, patientId, doctorId);
  }

  @ResolveField('doctor')
  async getDoctor(@Parent() appointment: Appointment): Promise<Doctor> {
    return await this.doctorsService.findOneById(appointment.doctorId);
  }

  @ResolveField('patient')
  async getPatient(@Parent() appointment: Appointment): Promise<Patient> {
    return await this.patientsService.findOneById(appointment.patientId);
  }

  @ResolveField('room')
  async getRoom(@Parent() appointment: ScheduledAppointment): Promise<Room> {
    console.log(appointment);

    return await this.roomsService.findOneById(appointment.roomId);
  }
}
