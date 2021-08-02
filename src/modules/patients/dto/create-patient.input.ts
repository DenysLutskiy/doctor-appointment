import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

@InputType()
export class CreatePatientInput {
  @Field()
  @IsString()
  @MinLength(2)
  gender: string;

  @Field()
  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @Field()
  @IsString()
  @MinLength(2)
  bornCity: string;

  @Field()
  @IsString()
  @MinLength(2)
  bornCountry: string;

  @Field()
  @IsString()
  @MinLength(2)
  address: string;
}
