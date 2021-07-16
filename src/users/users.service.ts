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

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
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

  async edit(userId: string, editUserInput: EditUserInput) {
    try {
      if (editUserInput.password) {
        editUserInput.password = await bcrypt.hash(editUserInput.password, 12);
      }
      await this.usersRepository.update(userId, editUserInput);
      return await this.usersRepository.findOne(userId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(userId: string) {
    try {
      const user = await this.usersRepository.findOne(userId);
      if (user.role !== Roles.ADMIN) {
        await this.usersRepository.delete(userId);
        return true;
      }
      const admins = await this.usersRepository.find({
        where: { role: 'admin' },
      });
      if (admins.length >= 2) {
        await this.usersRepository.delete(userId);
        return true;
      }
      throw new HttpException(
        'You cannot delete the last admin in the database',
        HttpStatus.BAD_REQUEST,
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.usersRepository.find();
  }
}
