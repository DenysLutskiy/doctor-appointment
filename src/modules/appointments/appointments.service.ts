import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as dateFormat from 'dateformat';

import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
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

  async findAll(): Promise<Appointment[]> {
    try {
      return await this.appointmentsRepository.find();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findManyWithOptions(options: object): Promise<Appointment[]> {
    try {
      return await this.appointmentsRepository.find(options);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
