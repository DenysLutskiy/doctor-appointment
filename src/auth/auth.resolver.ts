import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninUserInput } from './dto/signin-user.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('signinUser')
  signin(@Args('signinUserInput') signinUserInput: SigninUserInput) {
    return this.authService.signinWithLoginAndPassword(signinUserInput);
  }
}
