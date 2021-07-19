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

  // @Mutation('updateSpecialization')
  // update(
  //   @Args('updateSpecializationInput')
  //   updateSpecializationInput: UpdateSpecializationInput,
  // ) {
  //   return this.specializationsService.update(
  //     updateSpecializationInput.id,
  //     updateSpecializationInput,
  //   );
  // }

  // @Mutation('removeSpecialization')
  // remove(@Args('id') id: number) {
  //   return this.specializationsService.remove(id);
  // }

  // @Query('specializations')
  // findAll() {
  //   return this.specializationsService.findAll();
  // }

  // @Query('specialization')
  // findOne(@Args('id') id: number) {
  //   return this.specializationsService.findOne(id);
  // }
}
