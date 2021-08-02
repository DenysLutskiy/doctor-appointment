import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { AppointmentsService } from '../appointments/appointments.service';
import { DoctorsService } from '../doctors/doctors.service';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    private readonly doctorsService: DoctorsService,
    private readonly appointmentsService: AppointmentsService,
  ) {}

  async create(createRoomInput: CreateRoomInput): Promise<Room> {
    try {
      return await this.roomsRepository.save(createRoomInput);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(id: string, editRoomInput: any): Promise<Room> {
    const updatedRoom = await this.roomsRepository.update(id, editRoomInput);
    if (!updatedRoom) {
      throw new HttpException("Room wasn't updated", HttpStatus.BAD_REQUEST);
    }
    return await this.roomsRepository.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const doctors = await this.doctorsService.findManyWithOptions({
      where: { roomId: id },
    });

    const appointments = await this.appointmentsService.findManyWithOptions({
      where: { roomId: id },
    });

    if (doctors.length || appointments.length) {
      throw new HttpException(
        'The doctor can’t be removed if he is assigned to Room or he has a scheduled appointment',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedRoom = await this.roomsRepository.delete(id);
    if (!deletedRoom) {
      throw new HttpException("Room wasn't deleted", HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async findAll(): Promise<Room[]> {
    try {
      return await this.roomsRepository.find();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
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
