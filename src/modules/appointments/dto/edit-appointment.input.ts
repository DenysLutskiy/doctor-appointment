import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsString } from 'class-validator';

@InputType()
export class EditAppointmentInput {
  @Field()
  @IsString()
  roomId: string;

  @Field()
  @IsDateString()
  appointmentStart: string;

  @Field()
  @IsNumber()
  duration: number;

  appointmentEnd: string;
}
