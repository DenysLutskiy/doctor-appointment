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

@Resolver('Appointment')
export class AppointmentsResolver {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientsService,
    private readonly roomsService: RoomsService,
  ) {}

  @Mutation('createAppointment')
  create(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentInput);
  }

  @Query('appointments')
  findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
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
  async getRoom(@Parent() appointment: Appointment): Promise<Room> {
    return await this.roomsService.findOneById(appointment.roomId);
  }
}
