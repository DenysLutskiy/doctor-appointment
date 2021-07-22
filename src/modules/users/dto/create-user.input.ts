import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsString,
  Length,
  IsEmail,
  IsOptional,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(2)
  firstName: string;

  @Field()
  @IsString()
  @MinLength(2)
  lastName: string;

  @Field()
  @IsString()
  @Length(10, 15)
  mobilePhone: string;

  @Field()
  @IsDefined()
  @IsEmail()
  email: string;

  @Field()
  @IsOptional()
  login: string;

  @Field()
  @IsString()
  @Length(6, 48)
  password: string;

  @Field()
  @IsString()
  @IsOptional()
  role: string;
}
