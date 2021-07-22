import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecializationInput } from './dto/create-specialization.input';
import { Specialization } from './entities/specialization.entity';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectRepository(Specialization)
    private specializationRepository: Repository<Specialization>,
  ) {}

  create(
    createSpecializationInput: CreateSpecializationInput,
  ): Promise<Specialization> {
    try {
      return this.specializationRepository.save(createSpecializationInput);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneById(id: string): Promise<Specialization> {
    try {
      return await this.specializationRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
