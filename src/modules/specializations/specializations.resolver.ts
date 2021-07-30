import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { CreateSpecializationInput } from './dto/create-specialization.input';
import { EditSpecializationInput } from './dto/edit-specialization.input';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsService } from './specializations.service';
import { CanPass } from 'src/utils/canpass.decorator';
import { Roles } from 'src/types/enums/user-roles.enum';

@Resolver('Specialization')
export class SpecializationsResolver {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Mutation('createSpecialization')
  @CanPass(Roles.ADMIN)
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
