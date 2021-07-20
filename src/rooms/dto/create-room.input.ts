import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, IsArray, IsOptional } from 'class-validator';

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
  doctorIds: string[];
}
