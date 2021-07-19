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

  create(createSpecializationInput: CreateSpecializationInput) {
    return this.specializationRepository.save(createSpecializationInput);
  }

  // findAll() {
  //   return `This action returns all specializations`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} specialization`;
  // }

  // update(id: number, updateSpecializationInput: UpdateSpecializationInput) {
  //   return `This action updates a #${id} specialization`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} specialization`;
  // }
}
