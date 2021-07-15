import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, Length, IsEmail, Min } from 'class-validator';

@InputType()
export class EditUserInput {
  @Field({ nullable: true })
  @IsString()
  @Min(2)
  firstName: string;

  @Field({ nullable: true })
  @IsString()
  @Min(2)
  lastName: string;

  @Field({ nullable: true })
  @IsString()
  @Length(10, 15)
  mobilePhone: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @Length(6, 48)
  password: string;

  @Field({ nullable: true })
  @IsString()
  role: string;
}
