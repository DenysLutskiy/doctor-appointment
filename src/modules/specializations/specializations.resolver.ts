import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateSpecializationInput } from './dto/create-specialization.input';
import { Specialization } from './entities/specialization.entity';
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
  ): Promise<Specialization> {
    return this.specializationsService.create(createSpecializationInput);
  }
}
