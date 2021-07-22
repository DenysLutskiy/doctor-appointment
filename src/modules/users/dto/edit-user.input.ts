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
export class EditUserInput {
  @Field()
  @IsString()
  @MinLength(2)
  @IsOptional()
  firstName: string;

  @Field()
  @IsString()
  @MinLength(2)
  @IsOptional()
  lastName: string;

  @Field()
  @IsString()
  @Length(10, 15)
  @IsOptional()
  mobilePhone: string;

  @Field()
  @IsEmail()
  @IsDefined()
  @IsOptional()
  email: string;

  @Field()
  @IsString()
  @Length(6, 48)
  @IsOptional()
  password: string;

  @Field()
  @IsString()
  @IsOptional()
  role: string;
}
