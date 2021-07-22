import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async create(createRoomInput: CreateRoomInput): Promise<Room> {
    try {
      return await this.roomsRepository.save({
        name: createRoomInput.name,
        doctorId: createRoomInput.doctorId,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Room[]> {
    try {
      return await this.roomsRepository.find();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
