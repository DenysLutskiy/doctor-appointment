import { forwardRef, Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Roles } from '../enums/user-roles.enum';
@Resolver('User')
export class RolesInfoFieldResolver {
  constructor(
    @Inject(forwardRef(() => DoctorsService))
    private readonly doctorsService: DoctorsService,
  ) {}

  @ResolveField('roleInfo')
  async getRoleInfo(@Parent() user: User): Promise<any> {
    if (user.role === Roles.DOCTOR) {
      const doctor = await this.doctorsService.findOneById(null, {
        where: { userId: user.id },
      });
      console.log(doctor);

      return doctor;
    }
  }
}

@Resolver('RolesInfo')
export class RolesInfoTypeResolver {
  @ResolveField()
  __resolveType(value): any {
    if (value.level) {
      return 'Doctor';
    }
    if (value.gender) {
      return 'Patient';
    }
    return null;
  }
}

export type RolesInfo = Doctor | Patient;
