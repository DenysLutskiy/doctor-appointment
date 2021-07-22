import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { CreatePatientInput } from './dto/create-patient.input';
import { Patient } from './entities/patient.entity';
import { UseGuards } from '@nestjs/common';
import { DoctorGuard } from 'src/guards/doctor.guard';
import { CreateUserInput } from '../users/dto/create-user.input';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Resolver('Patient')
export class PatientsResolver {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation('createPatient')
  @UseGuards(DoctorGuard)
  create(
    @Args('createPatientInput') createPatientInput: CreatePatientInput,
    @Args('userId') userId: string,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<Patient> {
    return this.patientsService.create(
      createPatientInput,
      userId,
      createUserInput,
    );
  }

  @Query('patients')
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Query('patient')
  findOne(@Args('patientId') patientId: string): Promise<Patient> {
    return this.patientsService.findOneById(patientId);
  }

  @ResolveField('user')
  async getUser(@Parent() patient: Patient): Promise<User> {
    return await this.usersService.findOneById(patient.userId);
  }
}
