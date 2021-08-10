import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';

import { RoomsService } from './rooms.service';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './entities/room.entity';
import { CanPass } from 'src/utils/canpass.decorator';
import { Roles } from 'src/types/enums/user-roles.enum';
import { EditRoomInput } from './dto/edit-room.input';
import { User } from '../users/entities/user.entity';

@Resolver('Room')
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation('createRoom')
  @CanPass(Roles.ADMIN)
  create(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return this.roomsService.create(createRoomInput);
  }

  @Mutation('editRoom')
  @CanPass(Roles.ADMIN)
  edit(
    @Args('roomId') roomId: string,
    @Args('editRoomInput') editRoomInput: EditRoomInput,
  ): Promise<Room> {
    return this.roomsService.edit(roomId, editRoomInput);
  }

  @Mutation('deleteRoom')
  @CanPass(Roles.ADMIN)
  delete(@Args('roomId') roomId: string): Promise<boolean> {
    return this.roomsService.delete(roomId);
  }

  @Query('rooms')
  @CanPass(Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT)
  findAll(
    @Context('user') user: User,
    @Args('filter') filter: string,
  ): Promise<Room[]> {
    return this.roomsService.findAll(filter, user);
  }

  @ResolveField('doctorId')
  resolveDoctorId(@Parent() room: Room, @Context('user') user: User): string {
    if (user.role === Roles.ADMIN || user.role === Roles.DOCTOR) {
      return room.doctorId;
    }
    return null;
  }
}
