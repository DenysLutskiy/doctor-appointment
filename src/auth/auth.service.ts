import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

import { signInResponseType } from 'src/types/interfaces/signin-response.interface';
import { User } from 'src/users/entities/user.entity';
import { SigninUserInput } from './dto/signin-user.input';
import { JWTPayloadType } from 'src/types/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
        expiresIn: '7d',
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

  async signoutUser(token: string) {
    try {
      const tokenMeta: JWTPayloadType = jwt.decode(token) as JWTPayloadType;
      const tokenTTL = tokenMeta.exp - tokenMeta.iat;
      console.log(tokenTTL);

      await this.cacheManager.set(token, token, { ttl: tokenTTL });
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }
}
