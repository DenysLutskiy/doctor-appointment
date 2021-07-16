import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHospitalInput } from './dto/create-hospital.input';
import { EditHospitalInput } from './dto/edit-hospital.input';
import { Hospital } from './entities/hospital.entity';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalsRepository: Repository<Hospital>,
  ) {}

  async create(createHospitalInput: CreateHospitalInput) {
    try {
      return await this.hospitalsRepository.save({
        ...createHospitalInput,
        phoneNumbers: createHospitalInput.phoneNumbers.join(', '),
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(id: string, editHospitalInput: EditHospitalInput) {
    try {
      return await this.hospitalsRepository.update(id, {
        ...editHospitalInput,
        phoneNumbers: editHospitalInput.phoneNumbers.join(' '),
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      await this.hospitalsRepository.delete(id);
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
