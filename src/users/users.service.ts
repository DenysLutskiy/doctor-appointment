import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    console.log(createUserInput);
    const res = await this.usersRepository.save(createUserInput);
    console.log(res);
    return true;
  }

  findAll() {
    return `This action returns all users`;
  }
}
