import {DataSource, Repository} from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/createCompanyDto';
import { UpdateCompanyDto } from './dto/updateCompanyDto';
import { Injectable } from '@nestjs/common';
import AppDataSource from "../typeorm.config";



@Injectable()
export class CompanyRepository extends Repository<Company> {

  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }
  public async findAll(userId:number ): Promise<Company[]> {
    // console.log(typeof(userId))
     const  response= await  this.createQueryBuilder('Company')
        .leftJoin('Company.users', 'user')
         .where('user.id = :id', { id: userId})
        .getMany();
    return response;
  }

  public async findById(companyId: number): Promise<Company> {
    return await this.findOne({ where: { id: companyId } });
  }

  public async createItem(companyDto: CreateCompanyDto): Promise<Company> {
    const company = this.create(companyDto);

    return this.save(company);
  }

  public async updateById(
    companyId: number,
    { name, description }: UpdateCompanyDto
  ): Promise<number> {
    const update = await this.update(companyId, {
      name:name,
      description:description
    });

    return update.affected;
  }

  public async deleteById(companyId: number): Promise<number> {
    const delet = await this.delete({ id: companyId });

    return delet.affected;
  }
}
