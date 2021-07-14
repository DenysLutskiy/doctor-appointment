import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v1 as uuid } from 'uuid';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { SigninUserInput } from './dto/signin-user.input';
import { signInResponseType } from 'src/types/interfaces/signin-response.interface';
import { JWTPayloadType } from 'src/types/interfaces/payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      if (!createUserInput.login) {
        createUserInput.login = createUserInput.firstName + uuid();
      }
      const hash = await bcrypt.hash(createUserInput.password, 12);
      const user = await this.usersRepository.save({
        ...createUserInput,
        password: hash,
      });
      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
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
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      const signInResponse = {
        user,
        token,
      };
      return signInResponse;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }

  findAll() {
    return this.usersRepository.find();
  }
}
