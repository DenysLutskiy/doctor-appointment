import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, IsArray } from 'class-validator';

@InputType()
export class CreateDoctorInput {
  @Field()
  @IsDefined()
  @IsString()
  userId: string;

  @Field()
  @IsDefined()
  @IsString()
  specializationId: string;

  @Field()
  @IsDefined()
  @IsString()
  level: string;
}
