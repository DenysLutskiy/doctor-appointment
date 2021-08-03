import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/types/enums/user-roles.enum';
import {
  InfoForAdmin,
  InfoForGuest,
} from 'src/types/unions/restristed-rooms.union';
import { FindOneOptions, ILike, Repository } from 'typeorm';

import { AppointmentsService } from '../appointments/appointments.service';
import { DoctorsService } from '../doctors/doctors.service';
import { EditDoctorInput } from '../doctors/dto/edit-doctor.input';
import { User } from '../users/entities/user.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @Inject(forwardRef(() => DoctorsService))
    private doctorsService: DoctorsService,
    private readonly appointmentsService: AppointmentsService,
  ) {}

  async create(createRoomInput: CreateRoomInput): Promise<Room> {
    const room: Room = await this.roomsRepository.save(createRoomInput);

    if (room && createRoomInput.doctorId) {
      const doctor = await this.doctorsService.findOneById(
        createRoomInput.doctorId,
      );

      const rooms = doctor.associatedRooms || [];
      rooms.push(room.id);
      const newRoomsList: EditDoctorInput = {
        associatedRooms: rooms,
      };
      await this.doctorsService.edit(createRoomInput.doctorId, newRoomsList);
    }

    return room;
  }

  async edit(id: string, editRoomInput: any): Promise<Room> {
    const updatedRoom = await this.roomsRepository.update(id, editRoomInput);
    if (!updatedRoom) {
      throw new HttpException("Room wasn't updated", HttpStatus.BAD_REQUEST);
    }
    return await this.roomsRepository.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const appointments = await this.appointmentsService.findManyWithOptions({
      where: { roomId: id },
    });

    if (appointments.length) {
      throw new HttpException(
        'The room can’t be removed if it attached to a scheduled appointment',
        HttpStatus.BAD_REQUEST,
      );
    }

    const room = await this.roomsRepository.findOne(id);
    if (!room) {
      throw new HttpException("Room wasn't found", HttpStatus.NOT_FOUND);
    }

    let associatedDoctor: string;
    if (room.doctorId) {
      associatedDoctor = room.doctorId;
    }

    const deletedRoom = await this.roomsRepository.delete(id);
    if (!deletedRoom) {
      throw new HttpException("Room wasn't deleted", HttpStatus.BAD_REQUEST);
    }

    let associatedRooms: string[];
    if (associatedDoctor) {
      associatedRooms = (
        await this.doctorsService.findOneById(associatedDoctor)
      ).associatedRooms;
    }

    if (associatedRooms.length) {
      const newRoomsList: EditDoctorInput = {
        associatedRooms: associatedRooms.filter((roomId) => roomId !== id),
      };
      await this.doctorsService.edit(associatedDoctor, newRoomsList);
    }

    return true;
  }

  async findAll(
    filter = '',
    user: User,
  ): Promise<InfoForAdmin[] | InfoForGuest[]> {
    const resp: Room[] = await this.roomsRepository.find({
      where: [{ name: ILike(`%${filter}%`) }],
    });
    if (user.role === Roles.ADMIN || user.role === Roles.DOCTOR) {
      resp.map((room) =>
        !room.doctorId
          ? (room.doctorId = 'this room has no assigned doctor')
          : room.doctorId,
      );
      return resp;
    }
    resp.map((room) => delete room.doctorId);
    return resp;
  }

  async findOneById(id: string): Promise<Room> {
    try {
      return await this.roomsRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async findManyWithOptions(options: FindOneOptions<Room>): Promise<Room[]> {
    try {
      return await this.roomsRepository.find(options);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
