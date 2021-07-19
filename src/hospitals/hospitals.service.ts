import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
      return await this.hospitalsRepository.save(createHospitalInput);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(id: string, editHospitalInput: EditHospitalInput) {
    try {
      const hospital = await this.hospitalsRepository.findOne(id);
      const numbers = new Set([
        ...hospital.phoneNumbers,
        ...editHospitalInput.phoneNumbers,
      ]);
      return await this.hospitalsRepository.update(id, {
        ...editHospitalInput,
        phoneNumbers: Array.from(numbers),
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deletePhoneNumber(id: string, phoneNumbers: string[]) {
    try {
      const hospital = await this.hospitalsRepository.findOne(id);
      if (phoneNumbers.length >= hospital.phoneNumbers.length) {
        throw new HttpException(
          `At least one number must remain`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const remainingNumbers = hospital.phoneNumbers.filter(
        (n) => !phoneNumbers.includes(n),
      );
      return await this.hospitalsRepository.update(id, {
        phoneNumbers: remainingNumbers,
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

  findAll(filter: undefined | string) {
    try {
      if (filter) {
        const text = ILike(`%${filter}%`);
        return this.hospitalsRepository.find({
          where: [{ name: text }, { address: text }],
        });
      }
      return this.hospitalsRepository.find();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: string) {
    try {
      return this.hospitalsRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
