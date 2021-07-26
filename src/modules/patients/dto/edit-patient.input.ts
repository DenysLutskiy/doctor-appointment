import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class EditPatientInput {
  @Field()
  @IsString()
  @IsOptional()
  @MinLength(2)
  gender: string;

  @Field()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(150)
  age: number;

  @Field()
  @IsString()
  @IsOptional()
  @MinLength(2)
  bornCity: string;

  @Field()
  @IsString()
  @IsOptional()
  @MinLength(2)
  bornCountry: string;

  @Field()
  @IsString()
  @IsOptional()
  @MinLength(2)
  address: string;
}
