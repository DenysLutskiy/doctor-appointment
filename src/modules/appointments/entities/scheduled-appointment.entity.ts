import { Field, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/modules/rooms/entities/room.entity';

@ObjectType()
export class ScheduledAppointment {
  @Field()
  id: string;

  @Field()
  patientName: string;

  @Field()
  doctorName: string;

  @Field()
  room: Room;

  roomId: string;

  @Field()
  appointmentStart: Date;

  @Field()
  duration: number;
}
