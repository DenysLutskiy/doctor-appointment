import { forwardRef, Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DoctorsService } from 'src/modules/doctors/doctors.service';
import { PatientsService } from 'src/modules/patients/patients.service';
import { User } from 'src/modules/users/entities/user.entity';
import { Roles } from '../enums/user-roles.enum';
@Resolver('User')
export class RolesInfoFieldResolver {
  constructor(
    @Inject(forwardRef(() => DoctorsService))
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientsService,
  ) {}

  @ResolveField('roleInfo')
  async getRoleInfo(@Parent() user: User): Promise<any> {
    if (user.role === Roles.DOCTOR) {
      return await this.doctorsService.findOne(null, {
        where: { userId: user.id },
      });
    }
    if (user.role === Roles.PATIENT) {
      return await this.patientsService.findOne(null, {
        where: { userId: user.id },
      });
    }
    if (user.role === Roles.ADMIN) {
      return {
        permissions: 'all',
      };
    }
    if (user.role === Roles.GUEST) {
      return {
        registered: true,
      };
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
    if (value.permissions) {
      return 'Admin';
    }
    if (value.registered) {
      return 'Guest';
    }
    return null;
  }
}
