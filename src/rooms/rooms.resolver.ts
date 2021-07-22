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
import { DoctorsService } from 'src/doctors/doctors.service';
import { Room } from './entities/room.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Resolver('Room')
export class RoomsResolver {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly roomsService: RoomsService,
  ) {}

  @Mutation('createRoom')
  @UseGuards(AdminGuard)
  create(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return this.roomsService.create(createRoomInput);
  }

  @Query('rooms')
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @ResolveField('doctor')
  async getUser(@Parent() room: Room): Promise<Doctor> {
    return await this.doctorsService.findById(room.doctorId);
  }
}