import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, IsArray, IsOptional } from 'class-validator';

@InputType()
export class EditHospitalInput {
  @Field()
  @IsString()
  @IsOptional()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  address: string;

  @Field()
  @IsArray()
  @IsOptional()
  phoneNumbers: string[];
}
