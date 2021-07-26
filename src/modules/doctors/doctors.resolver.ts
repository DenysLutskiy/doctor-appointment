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
import { Specialization } from 'src/modules/specializations/entities/specialization.entity';
import { SpecializationsService } from 'src/modules/specializations/specializations.service';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { DoctorsService } from './doctors.service';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { EditDoctorInput } from './dto/edit-doctor.input';
import { Doctor } from './entities/doctor.entity';

@Resolver('Doctor')
@UseGuards(AdminGuard)
export class DoctorsResolver {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly usersService: UsersService,
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Mutation('createDoctor')
  create(
    @Args('createDoctorInput') createDoctorInput: CreateDoctorInput,
  ): Promise<Doctor> {
    return this.doctorsService.create(createDoctorInput);
  }

  @Mutation('editDoctor')
  edit(
    @Args('doctorId') doctorId: string,
    @Args('editDoctorInput') editDoctorInput: EditDoctorInput,
  ): Promise<Doctor> {
    return this.doctorsService.edit(doctorId, editDoctorInput);
  }

  @Mutation('deleteDoctor')
  delete(@Args('doctorId') doctorId: string): Promise<boolean> {
    return this.doctorsService.delete(doctorId);
  }

  @Query('doctors')
  findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @ResolveField('user')
  async getUser(@Parent() doctor: Doctor): Promise<User> {
    return await this.usersService.findOneById(doctor.userId);
  }

  @ResolveField('specialization')
  async getSpecialization(@Parent() doctor: Doctor): Promise<Specialization> {
    return await this.specializationsService.findOneById(
      doctor.specializationId,
    );
  }
}
