import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class EditDoctorInput {
  @Field()
  @IsString()
  specializationId?: string;

  @Field()
  @IsString()
  level?: string;

  associatedRooms?: string[];
}
