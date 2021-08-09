import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class EditRoomInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsOptional()
  @IsString()
  doctorId: string;
}
