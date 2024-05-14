import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete, NotFoundException,
} from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './entities/createCompanyDto';
import {CompanyService} from "./company.service";
import {UpdateCompanyDto} from "./entities/updateCompanyDto";

@Controller('/api/v1/companies')
export class CompanyController {
  constructor(private companyService: CompanyService) { }

  @Get()
  public async findAll(): Promise<Company[]> {
    return await this.companyService.getAll();
  }

  @Get('/:Id')
  public async findOne(@Param('Id') companyId: number): Promise<Company> {
  return await this.companyService.getByFilters(companyId);
  }

  @Post()
  public async create(
      @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.create(createCompanyDto);
  }

  @Patch('/:Id')
  public async update(
      @Body() updateCompanyDto: UpdateCompanyDto,
      @Param('Id') companyId: number,
  ): Promise<Company> {

    return await this.companyService.updateById(
        companyId,
        updateCompanyDto,
    )
  }

  @Delete('/:Id')
  public async delete(@Param('Id') companyId: number): Promise<void> {
   await this.companyService.deleteById(companyId);
  }
}