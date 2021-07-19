import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalInput } from './dto/create-hospital.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { EditHospitalInput } from './dto/edit-hospital.input';
import { UserGuard } from 'src/guards/user.guard';

@Resolver('Hospital')
export class HospitalsResolver {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Mutation('createHospital')
  @UseGuards(AdminGuard)
  create(
    @Args('createHospitalInput') createHospitalInput: CreateHospitalInput,
  ) {
    return this.hospitalsService.create(createHospitalInput);
  }

  @Mutation('editHospital')
  @UseGuards(AdminGuard)
  edit(
    @Args('id') hospitalId: string,
    @Args('editHospitalInput') editHospitalInput: EditHospitalInput,
  ) {
    return this.hospitalsService.edit(hospitalId, editHospitalInput);
  }

  @Mutation('deletePhoneNumber')
  @UseGuards(AdminGuard)
  deletePhoneNumber(
    @Args('id') hospitalId: string,
    @Args('phoneNumbers') phoneNumbers: string[],
  ) {
    return this.hospitalsService.deletePhoneNumber(hospitalId, phoneNumbers);
  }

  @Mutation('deleteHospital')
  @UseGuards(AdminGuard)
  delete(@Args('id') hospitalId: string) {
    return this.hospitalsService.delete(hospitalId);
  }

  @Query('hospitals')
  @UseGuards(UserGuard)
  findAll(@Args('filter') filter?: string) {
    return this.hospitalsService.findAll(filter);
  }

  @Query('hospital')
  @UseGuards(UserGuard)
  findOne(@Args('id') hospitalId: string) {
    return this.hospitalsService.findOne(hospitalId);
  }
}
