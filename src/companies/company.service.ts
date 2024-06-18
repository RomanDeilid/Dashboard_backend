import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/createCompanyDto';
import { UpdateCompanyDto } from './dto/updateCompanyDto';
import { CompanyRepository } from './company.repositories';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository
  ) {}

  public async findAll(): Promise<Company[]> {
    return await this.companyRepository.findAll();
  }

  public async findById(companyId: number): Promise<Company> {
    try {
      const company = await this.companyRepository.findById(companyId);
      if (!company) {
        throw new Error();
      }

      return company;
    } catch (error) {
      throw new HttpException(
        ` Bad request, company by ID=${companyId} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async createItem(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.createItem(createCompanyDto);
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(
          'Bad request, this company already exists',
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async updateById(
    companyId: number,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<void> {
    try {
      const updateCompany = await this.companyRepository.updateById(
        companyId,
        updateCompanyDto
      );
      if (!updateCompany) {
        throw new Error();
      }
    } catch (error) {
      if (error.code == '23505') {
        console.log(error);
        throw new HttpException(
          'Bad request, this company already exists',
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException(
          ` Bad request, company by ID=${companyId} not found`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  public async deleteById(companyId: number): Promise<void> {
    try {
      const deletCompany = await this.companyRepository.deleteById(companyId);
      if (!deletCompany) {
        throw new Error();
      } else {
      }
    } catch (error) {
      throw new HttpException(
        `Bad request, company by ID=${companyId} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
