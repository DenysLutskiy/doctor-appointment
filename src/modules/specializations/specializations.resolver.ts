import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { AdminGuard } from 'src/guards/admin.guard';
import { DoctorsService } from '../doctors/doctors.service';
import { Doctor } from '../doctors/entities/doctor.entity';
import { CreateSpecializationInput } from './dto/create-specialization.input';
import { EditSpecializationInput } from './dto/edit-specialization.input';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsService } from './specializations.service';

@Resolver('Specialization')
@UseGuards(AdminGuard)
export class SpecializationsResolver {
  constructor(
    private readonly specializationsService: SpecializationsService,
    private readonly doctorsService: DoctorsService,
  ) {}

  @Query('specializations')
  findAll(@Args('name') specializationName: string): Promise<Specialization[]> {
    return this.specializationsService.findAll(specializationName);
  }

  @Mutation('createSpecialization')
  create(
    @Args('createSpecializationInput')
    createSpecializationInput: CreateSpecializationInput,
  ): Promise<Specialization> {
    return this.specializationsService.create(createSpecializationInput);
  }

  @Mutation('editSpecialization')
  edit(
    @Args('specializationId')
    specializationId: string,
    @Args('editSpecializationInput')
    editSpecializationInput: EditSpecializationInput,
  ): Promise<Specialization> {
    return this.specializationsService.edit(
      specializationId,
      editSpecializationInput,
    );
  }

  @Mutation('deleteSpecialization')
  delete(
    @Args('specializationId')
    specializationId: string,
  ): Promise<boolean> {
    return this.specializationsService.delete(specializationId);
  }

  @ResolveField('doctors')
  async getDoctor(@Parent() specialization: Specialization): Promise<Doctor[]> {
    return await this.doctorsService.findManyWithOptions({
      where: { specializationId: specialization.id },
    });
  }
}
