import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AdminGuard } from 'src/guards/admin.guard';
import { SpecializationsService } from 'src/specializations/specializations.service';
import { UsersService } from 'src/users/users.service';
import { DoctorsService } from './doctors.service';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { Doctor } from './entities/doctor.entity';

@Resolver('Doctor')
export class DoctorsResolver {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly usersService: UsersService,
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Mutation('createDoctor')
  @UseGuards(AdminGuard)
  create(@Args('createDoctorInput') createDoctorInput: CreateDoctorInput) {
    return this.doctorsService.create(createDoctorInput);
  }

  @Query('doctors')
  findAll() {
    return this.doctorsService.findAll();
  }

  @ResolveField('user')
  async getUser(@Parent() doctor: Doctor) {
    return await this.usersService.findOne(doctor.user.id);
  }

  @ResolveField('specialization')
  async getSpecialization(@Parent() doctor: Doctor) {
    return await this.specializationsService.findOne(doctor.specialization.id);
  }
}
