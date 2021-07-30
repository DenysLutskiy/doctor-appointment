import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UpdateResult } from 'typeorm';

import { HospitalsService } from './hospitals.service';
import { CreateHospitalInput } from './dto/create-hospital.input';
import { EditHospitalInput } from './dto/edit-hospital.input';
import { Hospital } from './entities/hospital.entity';
import { CanPass } from 'src/utils/canpass.decorator';
import { Roles } from 'src/types/enums/user-roles.enum';

@Resolver('Hospital')
export class HospitalsResolver {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Mutation('createHospital')
  @CanPass(Roles.ADMIN)
  create(
    @Args('createHospitalInput') createHospitalInput: CreateHospitalInput,
  ): Promise<Hospital> {
    return this.hospitalsService.create(createHospitalInput);
  }

  @Mutation('editHospital')
  @CanPass(Roles.ADMIN)
  edit(
    @Args('id') hospitalId: string,
    @Args('editHospitalInput') editHospitalInput: EditHospitalInput,
  ): Promise<UpdateResult> {
    return this.hospitalsService.edit(hospitalId, editHospitalInput);
  }

  @Mutation('deletePhoneNumber')
  @CanPass(Roles.ADMIN)
  deletePhoneNumber(
    @Args('id') hospitalId: string,
    @Args('phoneNumbers') phoneNumbers: string[],
  ): Promise<UpdateResult> {
    return this.hospitalsService.deletePhoneNumber(hospitalId, phoneNumbers);
  }

  @Mutation('deleteHospital')
  @CanPass(Roles.ADMIN)
  delete(@Args('id') hospitalId: string): Promise<boolean> {
    return this.hospitalsService.delete(hospitalId);
  }

  @Query('hospital')
  findOne(@Args('id') hospitalId: string): Promise<Hospital> {
    return this.hospitalsService.findOneById(hospitalId);
  }

  @Query('hospitals')
  findAll(@Args('filter') filter: string): Promise<Hospital[]> {
    return this.hospitalsService.findAll(filter);
  }
}
