import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { signInResponseType } from 'src/types/interfaces/signin-response.interface';
import { User } from 'src/users/entities/user.entity';
import { SigninUserInput } from './dto/signin-user.input';
import { JWTPayloadType } from 'src/types/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signinWithLoginAndPassword(
    signInProps: SigninUserInput,
  ): Promise<signInResponseType> {
    try {
      const user = await this.usersRepository.findOne({
        where: { login: signInProps.login },
      });
      const passwordsMatch = await bcrypt.compare(
        signInProps.password,
        user.password,
      );
      if (!passwordsMatch) {
        throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
      }
      const { id, role, login } = user;
      const payload: JWTPayloadType = { id, role, login };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1m',
      });
      const signInResponse = {
        user,
        token,
      };
      return signInResponse;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }
}
