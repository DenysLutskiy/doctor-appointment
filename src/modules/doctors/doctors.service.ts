import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialization } from 'src/modules/specializations/entities/specialization.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Specialization)
    private specializationsRepository: Repository<Specialization>,
  ) {}
  async create(createDoctorInput: CreateDoctorInput): Promise<Doctor> {
    const doctor = await this.doctorsRepository.create(createDoctorInput);
    if (!doctor) {
      throw new HttpException(`Doctor wasn't created`, HttpStatus.BAD_REQUEST);
    }

    doctor.specialization = await this.specializationsRepository.findOne({
      id: createDoctorInput.specializationId,
    });
    doctor.user = await this.usersRepository.findOne({
      id: createDoctorInput.userId,
    });

    if (!doctor.user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!doctor.specialization) {
      throw new HttpException('Specialization not found', HttpStatus.NOT_FOUND);
    }

    return await this.doctorsRepository.save(doctor);
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
}
