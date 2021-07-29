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
import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { Room } from './entities/room.entity';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { CanPass } from 'src/utils/canpass.decorator';
import { Roles } from 'src/types/enums/user-roles.enum';

@Resolver('Room')
export class RoomsResolver {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly roomsService: RoomsService,
  ) {}

  @Mutation('createRoom')
  @CanPass(Roles.ADMIN)
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
