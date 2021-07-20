import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Room } from './entities/room.entity';

@Resolver('Room')
export class RoomsResolver {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly roomsService: RoomsService,
  ) {}

  @Mutation('createRoom')
  @UseGuards(AdminGuard)
  create(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.create(createRoomInput);
  }

  @Query('rooms')
  findAll() {
    return this.roomsService.findAll();
  }

  @ResolveField('doctors')
  async getUser(@Parent() room: Room) {
    return await this.doctorsService.findByIds(room.doctors);
  }
}
