import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../users/dto/create-user.input';
import { UsersService } from '../users/users.service';
import { CreatePatientInput } from './dto/create-patient.input';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createPatientInput: CreatePatientInput,
    userId?: string,
    createUserInput?: CreateUserInput,
  ): Promise<Patient> {
    if (userId && createUserInput) {
      throw new HttpException(
        'You can assign only userId OR new created one',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!createUserInput && !userId) {
      throw new HttpException(
        'You must provide userId or create new one',
        HttpStatus.BAD_REQUEST,
      );
    }
    const patien = this.patientsRepository.create(createPatientInput);
    if (userId && !createUserInput) {
      patien.userId = userId;
    }
    if (createUserInput && !userId) {
      const user = await this.usersService.create(createUserInput);
      patien.userId = user.id;
    }

    try {
      return await this.patientsRepository.save(patien);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  findAll(): Promise<Patient[]> {
    try {
      return this.patientsRepository.find();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  findOneById(id: string): Promise<Patient> {
    try {
      return this.patientsRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
