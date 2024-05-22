import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './entities/createCompanyDto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './entities/updateCompanyDto';

@Controller('/api/v1/companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  public async findAll_company(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  @Get('/:Id')
  public async findById_company(
    @Param('Id') companyId: number,
  ): Promise<Company> {
    return await this.companyService.findById(companyId);
  }

  @Post()
  public async create_company(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.createItem(createCompanyDto);
  }

  @Patch('/:Id')
  public async update_company(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param('Id') companyId: number,
  ): Promise<Company> {
    return await this.companyService.updateById(companyId, updateCompanyDto);
  }

  @Delete('/:Id')
  public async delete_company(@Param('Id') companyId: number): Promise<void> {
    await this.companyService.deleteById(companyId);
  }
}
