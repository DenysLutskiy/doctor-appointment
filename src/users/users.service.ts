import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      if (!createUserInput.login) {
        createUserInput.login =
          createUserInput.firstName + Math.round(Math.random() * 1000000);
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

  findAll() {
    return this.usersRepository.find();
  }
}
