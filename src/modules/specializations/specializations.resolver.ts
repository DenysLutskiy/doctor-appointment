import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AdminGuard } from 'src/guards/admin.guard';
import { CreateSpecializationInput } from './dto/create-specialization.input';
import { EditSpecializationInput } from './dto/edit-specialization.input';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsService } from './specializations.service';

@Resolver('Specialization')
@UseGuards(AdminGuard)
export class SpecializationsResolver {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

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
}
