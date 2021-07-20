import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateSpecializationInput } from './dto/create-specialization.input';
import { SpecializationsService } from './specializations.service';

@Resolver('Specialization')
export class SpecializationsResolver {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Mutation('createSpecialization')
  create(
    @Args('createSpecializationInput')
    createSpecializationInput: CreateSpecializationInput,
  ) {
    return this.specializationsService.create(createSpecializationInput);
  }
}
