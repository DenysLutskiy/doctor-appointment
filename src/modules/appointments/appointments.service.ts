import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomsService } from '../rooms/rooms.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private readonly roomsService: RoomsService,
  ) {}
  async create(
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    try {
      const appointmentsInThisRoom = await this.findManyWithOptions({
        where: { roomId: createAppointmentInput.roomId },
      });
      const timeOfScheduledAppointments = appointmentsInThisRoom.map(
        (appointment) => appointment.scheduleDateAndTime.getTime(),
      );
      const timeOfThisAppointment = new Date(
        createAppointmentInput.scheduleDateAndTime,
      ).getTime();
      const earliest = Math.min(...timeOfScheduledAppointments);
      const _latest = Math.max(...timeOfScheduledAppointments);
      let latest;
      if (appointmentsInThisRoom.length > 1) {
        latest =
          _latest +
          appointmentsInThisRoom.find(
            (appointment) =>
              appointment.scheduleDateAndTime.toISOString() ===
              new Date(_latest).toISOString(),
          ).duration;
      }

      //TODO: is a curent schedule time in a rage of scheduled appointments
      const isInRange =
        earliest <= timeOfThisAppointment && latest >= timeOfThisAppointment;
      //TODO: is a current appointment overlaping nearest ones

      // const scheduledStart = 0;
      // const scheduledEnd = 0;
      // const CurentStart = 0;
      // const CurentEnd = 0;
      // return (
      //   (CurentStart >= scheduledStart && CurentEnd <= scheduledEnd) ||
      //   (scheduledStart >= CurentStart && scheduledEnd <= CurentEnd)
      // );
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
