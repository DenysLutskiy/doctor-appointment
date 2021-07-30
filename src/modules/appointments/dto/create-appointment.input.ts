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
  scheduleDateAndTime: string;

  @Field()
  @IsNumber()
  duration: number;
}
