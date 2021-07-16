import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { User } from './entities/user.entity';
import { EditUserInput } from './dto/edit-user.input';
import { Roles } from 'src/types/enums/user-roles.enum';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  @UseGuards(UserGuard)
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context('user') user: User,
  ) {
    return this.usersService.create(createUserInput, user);
  }

  @Mutation('editUser')
  @UseGuards(UserGuard)
  edit(
    @Args('id') userId: string,
    @Args('editUserInput') editUserInput: EditUserInput,
    @Context('user') user: User,
  ) {
    if (user.role !== Roles.ADMIN) {
      throw new HttpException(
        "You don't have permissions",
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.usersService.edit(userId, editUserInput);
  }

  @Mutation('deleteUser')
  @UseGuards(UserGuard)
  delete(@Args('id') userId: string, @Context('user') user: User) {
    if (user.role !== Roles.ADMIN) {
      throw new HttpException(
        "You don't have permissions",
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.usersService.delete(userId);
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
