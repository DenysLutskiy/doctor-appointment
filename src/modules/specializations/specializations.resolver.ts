import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';

import { CreateSpecializationInput } from './dto/create-specialization.input';
import { EditSpecializationInput } from './dto/edit-specialization.input';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsService } from './specializations.service';
import { CanPass } from 'src/utils/canpass.decorator';
import { Roles } from 'src/types/enums/user-roles.enum';
import { DoctorsService } from '../doctors/doctors.service';
import { Doctor } from '../doctors/entities/doctor.entity';

@Resolver('Specialization')
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
