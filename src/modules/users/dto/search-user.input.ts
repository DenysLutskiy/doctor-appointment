import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class SearchUserInput {
  @Field()
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field()
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field()
  @IsString()
  @IsOptional()
  mobilePhone?: string;

  @Field()
  @IsString()
  @IsOptional()
  email?: string;
}
