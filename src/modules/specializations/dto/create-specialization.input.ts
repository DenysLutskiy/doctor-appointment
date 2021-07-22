import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString } from 'class-validator';

@InputType()
export class CreateSpecializationInput {
  @Field()
  @IsDefined()
  @IsString()
  name: string;
}
