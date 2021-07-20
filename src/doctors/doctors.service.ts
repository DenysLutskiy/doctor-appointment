import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialization } from 'src/specializations/entities/specialization.entity';
import { User } from 'src/users/entities/user.entity';
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
  async create(createDoctorInput: CreateDoctorInput) {
    const doctor = await this.doctorsRepository.create(createDoctorInput);
    console.log(doctor);

    const spec = await this.specializationsRepository.findOne({
      id: createDoctorInput.specializationId,
    });
    const user = await this.usersRepository.findOne({
      id: createDoctorInput.userId,
    });
    console.log(spec);

    doctor.specialization = spec;
    doctor.user = user;

    try {
      return await this.doctorsRepository.save(doctor);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.doctorsRepository.find({
        relations: ['user', 'specialization'],
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
