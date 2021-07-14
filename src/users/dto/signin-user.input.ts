import { Field, InputType } from "@nestjs/graphql";
import { IsDefined, IsString } from "class-validator";

@InputType()
export class SigninUserInput {
  @Field()
  @IsString()
  @IsDefined()
  login: string;

  @Field()
  @IsString()
  @IsDefined()
  password: string;
}