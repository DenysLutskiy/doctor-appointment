import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString } from 'class-validator';

@InputType()
export class EditSpecializationInput {
  @Field()
  @IsDefined()
  @IsString()
  name: string;
}
