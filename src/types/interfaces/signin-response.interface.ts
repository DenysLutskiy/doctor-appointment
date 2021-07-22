import { User } from 'src/modules/users/entities/user.entity';

export interface signInResponseType {
  user: User;
  token: string;
}
