import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { SigninUserInput } from './dto/signin-user.input';
import { UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { User } from './entities/user.entity';

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

  @Query('getMe')
  @UseGuards(UserGuard)
  me(@Context('user') user: User) {
    return user;
  }

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }
}
