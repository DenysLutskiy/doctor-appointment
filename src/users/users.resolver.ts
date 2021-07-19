import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { User } from './entities/user.entity';
import { EditUserInput } from './dto/edit-user.input';
import { Roles } from 'src/types/enums/user-roles.enum';
import { AdminGuard } from 'src/guards/admin.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  @UseGuards(AdminGuard)
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation('editUser')
  @UseGuards(AdminGuard)
  edit(
    @Args('id') userId: string,
    @Args('editUserInput') editUserInput: EditUserInput,
  ) {
    return this.usersService.edit(userId, editUserInput);
  }

  @Mutation('deleteUser')
  @UseGuards(AdminGuard)
  delete(@Args('id') userId: string) {
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
