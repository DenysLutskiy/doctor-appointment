import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @Field()
  @IsString()
  patientId: string;

  @Field()
  @IsString()
  doctorId: string;

  @Field()
  @IsString()
  roomId: string;

  @Field()
  @IsDateString()
  appointmentStart: string;

  @Field()
  @IsNumber()
  duration: number;
}
