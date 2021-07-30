import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      //* Getting all appointments in this room
      const appointmentsInThisRoom = await this.findManyWithOptions({
        where: { roomId: createAppointmentInput.roomId },
      });

      //* Getting time of this appointments and sort them
      const timeOfScheduledAppointments = appointmentsInThisRoom
        .map((appointment) => appointment.scheduleDateAndTime.getTime())
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

      //* Getting time of this appointment
      const timeOfThisAppointment = new Date(
        createAppointmentInput.scheduleDateAndTime,
      ).getTime();

      //* Finding closest to this appointment time
      const findClosest = (arr: number[], num: number): number => {
        if (arr == null) {
          return NaN;
        }

        let closest = arr[0];
        for (const item of arr) {
          if (Math.abs(item - num) < Math.abs(closest - num)) {
            closest = item;
          }
        }
        return closest;
      };

      //* Getting value of it
      const closest = findClosest(
        timeOfScheduledAppointments,
        timeOfThisAppointment,
      );

      //* Defining a position of the closest value
      let prev = 0;
      let next = 0;

      if (closest === timeOfThisAppointment) {
        throw new HttpException('this time is taken', HttpStatus.BAD_REQUEST);
      }
      if (closest < timeOfThisAppointment) {
        prev = closest;
        next = NaN;
      }
      if (closest > timeOfThisAppointment) {
        next = closest;
        prev = NaN;
      }

      //* Getting position(index) of closest value in appointments
      const indexOfClosest = (value: number): number => {
        return timeOfScheduledAppointments.indexOf(value);
      };

      //* Setting value for previous and next appointment
      if (prev) {
        const positionOfClosestRight = indexOfClosest(prev) + 1;
        if (timeOfScheduledAppointments.length > positionOfClosestRight) {
          next = timeOfScheduledAppointments[positionOfClosestRight];
        }
      } else if (next) {
        const positionOfClosestLeft = indexOfClosest(next) - 1;
        if (positionOfClosestLeft >= 0) {
          prev = timeOfScheduledAppointments[positionOfClosestLeft];
        }
      }

      //* Checking if curent appointment overlapping previous and/or next
      let scheduledAppointment: Appointment;
      let scheduledStart: number;
      let scheduledEnd: number;
      let CurentStart: number;
      let CurentEnd: number;

      const isOverlapping = (value: number | undefined): boolean => {
        if (!value) {
          return false;
        }
        scheduledAppointment = appointmentsInThisRoom.find(
          (appointment) =>
            new Date(appointment.scheduleDateAndTime).getTime() === value,
        );
        scheduledStart = value;
        scheduledEnd = value + scheduledAppointment.duration;
        CurentStart = timeOfThisAppointment;
        CurentEnd = CurentStart + createAppointmentInput.duration;

        return scheduledEnd >= CurentStart && scheduledStart <= CurentEnd;
      };

      if (isOverlapping(prev) || isOverlapping(next)) {
        throw new HttpException(
          'Appointments overlapping',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.appointmentsRepository.save(createAppointmentInput);
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
