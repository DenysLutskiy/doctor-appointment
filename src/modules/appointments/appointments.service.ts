import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import * as dateFormat from 'dateformat';

import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Appointment } from './entities/appointment.entity';
import { EditAppointmentInput } from './dto/edit-appointment.input';
import { ScheduledAppointment } from './entities/scheduled-appointment.entity';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';
import { User } from '../users/entities/user.entity';
import { Roles } from 'src/types/enums/user-roles.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @Inject(forwardRef(() => DoctorsService))
    private doctorsService: DoctorsService,
    @Inject(forwardRef(() => PatientsService))
    private readonly patientsService: PatientsService,
  ) {}

  async create(
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    try {
      const apStart = createAppointmentInput.appointmentStart;
      const apEnd = new Date(
        new Date(createAppointmentInput.appointmentStart).getTime() +
          createAppointmentInput.duration * (60 * 1000),
      ).toISOString();

      const scheduledAppointment = await this.appointmentsRepository.findOne({
        where: {
          roomId: createAppointmentInput.roomId,
          appointmentEnd: MoreThanOrEqual(
            `${dateFormat(apStart, 'yyyy-mm-dd HH:MM:ss')}`,
          ),
          appointmentStart: LessThanOrEqual(
            `${dateFormat(apEnd, 'yyyy-mm-dd HH:MM:ss')}`,
          ),
        },
      });

      if (scheduledAppointment) {
        throw new HttpException(
          'There is an intersection of appointment time',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.appointmentsRepository.save({
        ...createAppointmentInput,
        appointmentEnd: apEnd,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(
    id: string,
    editAppointmentInput: EditAppointmentInput,
  ): Promise<Appointment> {
    const apStart = editAppointmentInput.appointmentStart;
    const apEnd = new Date(
      new Date(editAppointmentInput.appointmentStart).getTime() +
        editAppointmentInput.duration * (60 * 1000),
    ).toISOString();

    const scheduledAppointment = await this.appointmentsRepository.findOne({
      where: {
        id: Not(id),
        roomId: editAppointmentInput.roomId,
        appointmentEnd: MoreThanOrEqual(
          `${dateFormat(apStart, 'yyyy-mm-dd HH:MM:ss')}`,
        ),
        appointmentStart: LessThanOrEqual(
          `${dateFormat(apEnd, 'yyyy-mm-dd HH:MM:ss')}`,
        ),
      },
    });

    if (scheduledAppointment) {
      throw new HttpException(
        'There is an intersection of appointment time',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedAppointment = await this.appointmentsRepository.update(id, {
      ...editAppointmentInput,
      appointmentEnd: apEnd,
    });
    if (!updatedAppointment) {
      throw new HttpException(
        "Appointment wasn't updated",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await this.findOneById(id);
  }

  async cancel(id: string): Promise<boolean> {
    const delAp = await this.appointmentsRepository.softDelete(id);
    if (!delAp) {
      throw new HttpException(
        "Appointment wasn't updated",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return true;
  }

  async findOneById(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne(id);
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }
    return appointment;
  }

  async findAll(
    user: User,
    roomId?: string,
    patientId?: string,
    doctorId?: string,
  ): Promise<ScheduledAppointment[]> {
    let doctor: string;
    let patient: string;
    const filter: Record<string, string> = {};

    if (
      (user.role === Roles.ADMIN && doctorId) ||
      (user.role === Roles.ADMIN && patientId)
    ) {
      if (doctorId) {
        doctor = (await this.doctorsService.findOneById(doctorId)).id;
        filter.doctorId = doctor;
      }
      if (patientId) {
        patient = (await this.doctorsService.findOneById(doctorId)).id;
        filter.patientId = patient;
      }
    }

    if (user.role === Roles.DOCTOR) {
      doctor = (
        await this.doctorsService.findOneById(null, {
          where: { userId: user.id },
        })
      ).id;
      filter.doctorId = doctor;
    }

    if (user.role === Roles.PATIENT) {
      patient = (
        await this.doctorsService.findOneById(null, {
          where: { userId: user.id },
        })
      ).id;
      filter.patientId = patient;
    }

    if (roomId) {
      filter.roomId = roomId;
    }

    const appointments = await this.appointmentsRepository.find({
      where: filter,
      relations: ['doctor', 'patient'],
    });
    const mappedAppointments = appointments.map(async (appointment) => {
      const patient = await this.patientsService.findOneById(
        appointment.patientId,
        { relations: ['user'] },
      );
      const doctor = await this.doctorsService.findOneById(
        appointment.doctorId,
        { relations: ['user'] },
      );

      const app: ScheduledAppointment = {
        ...appointment,
        patientName: `${patient.user.firstName} ${patient.user.lastName}`,
        doctorName: `${doctor.user.firstName} ${doctor.user.lastName}`,
      };
      return app;
    });

    return (await Promise.all(mappedAppointments)) as ScheduledAppointment[];
  }

  async findManyWithOptions(
    options: FindManyOptions<Appointment>,
  ): Promise<Appointment[]> {
    try {
      return await this.appointmentsRepository.find(options);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
