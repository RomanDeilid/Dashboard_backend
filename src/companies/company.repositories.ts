import {Repository, DataSource} from 'typeorm';
import { Company} from "./entities/company.entity";
import { CreateCompanyDto } from './entities/createCompanyDto';
import { UpdateCompanyDto } from './entities/updateCompanyDto';
import {Injectable} from "@nestjs/common";

@Injectable()
export class CompanyRepository extends Repository<Company> {
     constructor(private dataSource: DataSource) {
         super(Company, dataSource.createEntityManager());
     }

    public async findAll(): Promise<Company[]> {
        return await this.find({});
    }

    public async findById (companyId: number): Promise<Company> {
        return await this.findOne({ where: {id: companyId} });
    }

    public async createItem( {name, description }: CreateCompanyDto): Promise<Company> {
        const company = this.create({name, description});
        await this.save(company);
        return company;
    }

    public async updateById(userId: number, { name, description }: UpdateCompanyDto,): Promise<Company> {
        const company = await this.findOne({ where: {id: userId} });
        company.name = name;
        company.description = description;
        await this.save(company);
        return company;
    }

    public async deleteById (companyId: number): Promise<void> {
        const company = await this.findOne({ where: {id: companyId} });
        await this.remove(company);
    }
}

