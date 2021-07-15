import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v1 as uuid } from 'uuid';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { EditUserInput } from './dto/edit-user.input';
import { Roles } from 'src/types/enums/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput, user: User): Promise<User> {
    try {
      if (user.role !== Roles.ADMIN) {
        throw new HttpException(
          "You don't have permissions",
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (!createUserInput.login) {
        createUserInput.login = createUserInput.firstName + uuid();
      }
      const hash = await bcrypt.hash(createUserInput.password, 12);
      const createdUser = await this.usersRepository.save({
        ...createUserInput,
        password: hash,
      });
      return createdUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(userId: string, editUserInput: EditUserInput, user: User) {
    try {
      if (user.role !== Roles.ADMIN) {
        throw new HttpException(
          "You don't have permissions",
          HttpStatus.UNAUTHORIZED,
        );
      }
      console.log(typeof editUserInput.password);

      if (typeof editUserInput.password === 'string') {
        let hash = await bcrypt.hash(editUserInput.password, 12);
        await this.usersRepository.update(userId, {
          ...editUserInput,
          password: hash,
        });
        return await this.usersRepository.findOne(userId);
      }
      await this.usersRepository.update(userId, editUserInput);
      return await this.usersRepository.findOne(userId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.usersRepository.find();
  }
}
