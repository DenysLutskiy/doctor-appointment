import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { CreateSpecializationInput } from './dto/create-specialization.input';
import { EditSpecializationInput } from './dto/edit-specialization.input';
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

  async edit(
    id: string,
    editSpecializationInput: EditSpecializationInput,
  ): Promise<Specialization> {
    try {
      await this.specializationRepository.update(id, editSpecializationInput);
      return await this.findOneById(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const specialization = await this.findOneById(id, {
        relations: ['doctors'],
      });
      if (specialization.doctors.length >= 1) {
        throw new HttpException(
          'You can’t remove the last Specialization because it’s still assigned to a doctor',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.specializationRepository.delete(id);
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneById(
    id: string,
    options?: FindOneOptions<Specialization>,
  ): Promise<Specialization> {
    try {
      if (options) {
        return await this.specializationRepository.findOne(id, options);
      }
      return await this.specializationRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
