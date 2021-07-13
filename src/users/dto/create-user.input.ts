import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, Length, IsEmail, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  @IsString()
  @Min(2)
  firstName: string;

  @Field({ nullable: false })
  @IsString()
  @Min(2)
  lastName: string;

  @Field({ nullable: false })
  @IsString()
  @Length(10, 15)
  moilePhone: string;

  @Field({ nullable: false })
  @IsDefined()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  login: string;

  @Field({ nullable: false })
  @IsString()
  @Length(6, 48)
  password: string;

  @Field({ nullable: false })
  @IsString()
  @IsDefined()
  role: string;
}
