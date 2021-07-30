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
import { User } from 'src/modules/users/entities/user.entity';
import { SigninUserInput } from './dto/signin-user.input';
import { JWTPayloadType } from 'src/types/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateToken(auth: string): Promise<User> {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const token = auth.split(' ')[1];
    const tknRevoked = await this.cacheManager.get(token);

    if (tknRevoked) {
      throw new HttpException('Token is revoked', HttpStatus.UNAUTHORIZED);
    }

    let userPayload: JWTPayloadType;
    try {
      userPayload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayloadType;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersRepository.findOne(userPayload.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

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

  async signoutUser(token: string): Promise<boolean> {
    try {
      const tokenMeta: JWTPayloadType = jwt.decode(token) as JWTPayloadType;
      const tokenTTL = tokenMeta.exp - tokenMeta.iat;
      await this.cacheManager.set(token, token, { ttl: tokenTTL });
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }
}
