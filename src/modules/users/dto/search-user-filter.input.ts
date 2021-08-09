import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsArray, IsOptional } from 'class-validator';

@InputType()
export class SearchUserFilter {
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

  @Field()
  @IsArray()
  @IsOptional()
  roles?: string[];

  @Field()
  @IsString()
  @IsOptional()
  createdAt?: string;
}
