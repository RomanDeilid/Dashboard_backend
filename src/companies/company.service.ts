import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './entities/createCompanyDto';
import { UpdateCompanyDto } from './entities/updateCompanyDto';
import { CompanyRepository } from './company.repositories';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  public async findAll(): Promise<Company[]> {
    return await this.companyRepository.findAll();
  }

  public async findById(companyId: number): Promise<Company> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      throw new NotFoundException(`Company #${companyId} not found`);
    }
    return company;
  }

  public async createItem(
    createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    try {
      return await this.companyRepository.createItem(createCompanyDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateById(
    companyId: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    if (!(await this.companyRepository.findById(companyId))) {
      throw new NotFoundException(`Company #${companyId} not found`);
    }
    return this.companyRepository.updateById(companyId, updateCompanyDto);
  }

  public async deleteById(companyId: number): Promise<void> {
    const company = await this.findById(companyId);
    if (!company) {
      throw new NotFoundException(`Company #${companyId} not found`);
    }
    await this.companyRepository.deleteById(companyId);
  }
}
