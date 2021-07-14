import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { SigninUserInput } from './dto/signin-user.input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation('signinUser')
  signin(@Args('signinUserInput') signinUserInput: SigninUserInput) {
    return this.usersService.signinWithLoginAndPassword(signinUserInput);
  }

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }
}
