import { Injectable } from '@nestjs/common';
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
    return this.specializationRepository.save(createSpecializationInput);
  }

  async findOne(id: string) {
    const specialization = await this.specializationRepository.findOne(id);
    return specialization;
  }
}
