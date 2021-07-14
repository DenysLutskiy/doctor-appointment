import { User } from 'src/users/entities/user.entity';

export interface signInResponseType {
  user: User;
  token: string;
}
