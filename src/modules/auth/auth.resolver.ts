import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
<<<<<<< HEAD
=======

>>>>>>> feature/ft-59/ability_to_create_a_new_patient
import { signInResponseType } from 'src/types/interfaces/signin-response.interface';
import { AuthService } from './auth.service';
import { SigninUserInput } from './dto/signin-user.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('signoutUser')
  signout(@Context('token') token: string): Promise<boolean> {
    return this.authService.signoutUser(token);
  }

  @Mutation('signinUser')
  signin(
    @Args('signinUserInput') signinUserInput: SigninUserInput,
  ): Promise<signInResponseType> {
    return this.authService.signinWithLoginAndPassword(signinUserInput);
  }
}
