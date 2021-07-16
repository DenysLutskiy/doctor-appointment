import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UserGuard } from 'src/guards/user.guard';
import { AuthService } from './auth.service';
import { SigninUserInput } from './dto/signin-user.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('signoutUser')
  @UseGuards(UserGuard)
  signout(@Context('token') token: string) {
    return this.authService.signoutUser(token);
  }

  @Mutation('signinUser')
  signin(@Args('signinUserInput') signinUserInput: SigninUserInput) {
    return this.authService.signinWithLoginAndPassword(signinUserInput);
  }
}
