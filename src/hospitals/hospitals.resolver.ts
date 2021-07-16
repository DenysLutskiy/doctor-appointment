import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalInput } from './dto/create-hospital.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { EditHospitalInput } from './dto/edit-hospital.input';

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
    @Args('updateHospitalInput') editHospitalInput: EditHospitalInput,
  ) {
    return this.hospitalsService.edit(hospitalId, editHospitalInput);
  }

  @Mutation('deleteHospital')
  @UseGuards(AdminGuard)
  delete(@Args('id') hospitalId: string) {
    return this.hospitalsService.delete(hospitalId);
  }

  // @Query('hospitals')
  // findAll() {
  //   return this.hospitalsService.findAll();
  // }

  // @Query('hospital')
  // findOne(@Args('id') id: number) {
  //   return this.hospitalsService.findOne(id);
  // }
}
