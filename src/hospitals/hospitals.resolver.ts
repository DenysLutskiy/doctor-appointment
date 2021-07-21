import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalInput } from './dto/create-hospital.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { EditHospitalInput } from './dto/edit-hospital.input';
import { Hospital } from './entities/hospital.entity';
import { UpdateResult } from 'typeorm';

@Resolver('Hospital')
export class HospitalsResolver {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Mutation('createHospital')
  @UseGuards(AdminGuard)
  create(
    @Args('createHospitalInput') createHospitalInput: CreateHospitalInput,
  ): Promise<Hospital> {
    return this.hospitalsService.create(createHospitalInput);
  }

  @Mutation('editHospital')
  @UseGuards(AdminGuard)
  edit(
    @Args('id') hospitalId: string,
    @Args('editHospitalInput') editHospitalInput: EditHospitalInput,
  ): Promise<UpdateResult> {
    return this.hospitalsService.edit(hospitalId, editHospitalInput);
  }

  @Mutation('deletePhoneNumber')
  @UseGuards(AdminGuard)
  deletePhoneNumber(
    @Args('id') hospitalId: string,
    @Args('phoneNumbers') phoneNumbers: string[],
  ): Promise<UpdateResult> {
    return this.hospitalsService.deletePhoneNumber(hospitalId, phoneNumbers);
  }

  @Mutation('deleteHospital')
  @UseGuards(AdminGuard)
  delete(@Args('id') hospitalId: string): Promise<boolean> {
    return this.hospitalsService.delete(hospitalId);
  }
}
