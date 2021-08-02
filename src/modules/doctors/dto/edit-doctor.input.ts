import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString } from 'class-validator';

@InputType()
export class EditDoctorInput {
  @Field()
  @IsDefined()
  @IsString()
  specializationId: string;

  @Field()
  @IsDefined()
  @IsString()
  level: string;
}
