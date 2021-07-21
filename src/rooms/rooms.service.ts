import { Injectable } from '@nestjs/common';
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
    return await this.roomsRepository.save({
      name: createRoomInput.name,
      doctorId: createRoomInput.doctorId,
    });
  }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }
}
