import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Room } from '../rooms/entities/room.entity';
import { RoomsService } from '../rooms/rooms.service';
import { ScheduledAppointment } from './entities/scheduled-appointment.entity';

@Resolver('ScheduledAppointment')
export class ScheduledAppointmentResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @ResolveField('room')
  async getRoom(@Parent() appointment: ScheduledAppointment): Promise<Room> {
    return await this.roomsService.findOneById(appointment.roomId);
  }
}
