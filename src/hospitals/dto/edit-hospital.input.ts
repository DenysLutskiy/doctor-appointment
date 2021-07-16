import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, IsArray } from 'class-validator';

@InputType()
export class EditHospitalInput {
  @Field()
  @IsDefined()
  @IsString()
  name: string;

  @Field()
  @IsDefined()
  @IsString()
  address: string;

  @Field()
  @IsDefined()
  @IsArray()
  phoneNumbers: string[];
}
