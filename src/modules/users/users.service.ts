import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, ILike, In, Repository } from 'typeorm';
import { v1 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { EditUserInput } from './dto/edit-user.input';
import { User } from './entities/user.entity';
import { Roles } from 'src/types/enums/user-roles.enum';
import { SearchUserInput } from './dto/search-user.input';
import { SearchUserFilter } from './dto/search-user.filter';

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
      return await this.usersRepository.save({
        ...createUserInput,
        password: hash,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(userId: string, editUserInput: EditUserInput): Promise<User> {
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

  async delete(userId: string): Promise<boolean> {
    try {
      const user = await this.usersRepository.findOne(userId);
      let admins = [];
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      if (user.role === Roles.ADMIN) {
        admins = await this.usersRepository.find({
          where: { role: 'admin' },
        });
      }
      if (user.role === Roles.ADMIN && admins.length === 1) {
        throw new HttpException(
          'You cannot delete the last admin in the database',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.usersRepository.delete(userId);
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(
    input?: SearchUserInput,
    filter?: SearchUserFilter,
  ): Promise<User[]> {
    interface FindUserForm {
      firstName?: FindOperator<string>;
      lastName?: FindOperator<string>;
      email?: FindOperator<string>;
      mobilePhone?: FindOperator<string>;
      role?: FindOperator<string>;
      createdAt?: string;
    }

    const contains: FindUserForm = {};

    if (input) {
      input.firstName && (contains.firstName = ILike(`%${input.firstName}%`));

      input.lastName && (contains.lastName = ILike(`%${input.lastName}%`));

      input.email && (contains.email = ILike(`%${input.email}%`));

      input.mobilePhone &&
        (contains.mobilePhone = ILike(`%${input.mobilePhone}%`));
    }

    if (filter) {
      filter.roles &&
        (contains.role = In(filter.roles.map((role) => role.toLowerCase())));

      filter.createdAt && (contains.createdAt = filter.createdAt);
    }

    const users = await this.usersRepository.find({ where: contains ?? '' });
    if (!users) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async findOneById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }
}
