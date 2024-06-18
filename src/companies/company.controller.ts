import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/createCompanyDto';
import { UpdateCompanyDto } from './dto/updateCompanyDto';
import { CompanyService } from './company.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('/api/v1/companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @ApiOperation({ summary: 'просмотр всех компании' })
  @ApiResponse({ status: 200, type: [Company] })
  @Get()
  public async findAll(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  @ApiOperation({ summary: 'просмотр одного компании по ID' })
  @ApiResponse({ status: 200, type: Company })
  @Get('/:id')
  public async findById(@Param('id') companyId: number): Promise<Company> {
    return await this.companyService.findById(companyId);
  }

  @ApiOperation({ summary: 'создание компании' })
  @ApiResponse({ status: 201, type: Company })
  @Post()
  public async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyService.createItem(createCompanyDto);
  }

  @ApiOperation({ summary: 'Обновления компании по ID' })
  @ApiResponse({ status: 200 })
  @Put('/:id')
  public async updateById(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param('id') companyId: number
  ): Promise<void> {
    await this.companyService.updateById(companyId, updateCompanyDto);
  }

  @ApiOperation({ summary: 'удаление компании по ID' })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  @HttpCode(204)
  public async deleteById(@Param('id') companyId: number): Promise<void> {
    await this.companyService.deleteById(companyId);
  }
}
