import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @Field()
  @IsDefined()
  @IsString()
  name: string;

  @Field()
  @IsOptional()
  @IsDefined()
  @IsString()
  doctorId: string;
}
