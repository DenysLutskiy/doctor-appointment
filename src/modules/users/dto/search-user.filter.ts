import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsArray, IsOptional } from 'class-validator';

@InputType()
export class SearchUserFilter {
  @Field()
  @IsArray()
  @IsOptional()
  roles?: string[];

  @Field()
  @IsString()
  @IsOptional()
  createdAt?: string;
}
