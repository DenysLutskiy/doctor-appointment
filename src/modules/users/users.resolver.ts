import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { User } from './entities/user.entity';
import { EditUserInput } from './dto/edit-user.input';
import { AdminGuard } from 'src/guards/admin.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  @UseGuards(AdminGuard)
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Mutation('editUser')
  @UseGuards(AdminGuard)
  edit(
    @Args('id') userId: string,
    @Args('editUserInput') editUserInput: EditUserInput,
  ): Promise<User> {
    return this.usersService.edit(userId, editUserInput);
  }

  @Mutation('deleteUser')
  @UseGuards(AdminGuard)
  delete(@Args('id') userId: string): Promise<boolean> {
    return this.usersService.delete(userId);
  }

  @Query('getMe')
  @UseGuards(UserGuard)
  me(@Context('user') user: User): User {
    return user;
  }

  @Query('users')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
