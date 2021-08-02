import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { AppointmentsService } from '../appointments/appointments.service';
import { RoomsService } from '../rooms/rooms.service';

import { SpecializationsService } from '../specializations/specializations.service';
import { UsersService } from '../users/users.service';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    private readonly usersService: UsersService,
    private readonly specializationsService: SpecializationsService,
    private readonly appointmentsService: AppointmentsService,
    private readonly roomsService: RoomsService,
  ) {}
  async create(createDoctorInput: CreateDoctorInput): Promise<Doctor> {
    try {
      const doctor = this.doctorsRepository.create(createDoctorInput);
      doctor.specialization = await this.specializationsService.findOneById(
        createDoctorInput.specializationId,
      );
      doctor.user = await this.usersService.findOneById(
        createDoctorInput.userId,
      );

      return await this.doctorsRepository.save(doctor);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(doctorId: string): Promise<boolean> {
    const rooms = await this.roomsService.findManyWithOptions({
      where: { doctorId },
    });

    const appointments = await this.appointmentsService.findManyWithOptions({
      where: { doctorId },
    });

    if (rooms.length || appointments.length) {
      throw new HttpException(
        'The doctor can’t be removed if he is assigned to Room or he has a scheduled appointment',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.doctorsRepository.delete(doctorId);
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Doctor[]> {
    try {
      return await this.doctorsRepository.find();
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  async findOneById(id: string): Promise<Doctor> {
    try {
      return await this.doctorsRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  async findManyWithOptions(
    options: FindManyOptions<Doctor>,
  ): Promise<Doctor[]> {
    try {
      return await this.doctorsRepository.find(options);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
