import { DataSource, Repository } from 'typeorm';
import { Sheet } from './entities/sheet.entity';
import { CreateSheetDto } from './dto/createSheetDto';
import { UpdateSheetDto } from './dto/updateSheetDto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class SheetRepository extends Repository<Sheet> {
  constructor(private dataSource: DataSource) {
    super(Sheet, dataSource.createEntityManager());
  }

  public async findAll(companyId:number): Promise<Sheet[]> {
    const  response= await  this.createQueryBuilder('Sheet')
        .leftJoin('Sheet.company', 'company')
        .where('company.id = :id', { id: companyId})
        .getMany();

    return response;

  }

  public async findById(sheetId: number): Promise<Sheet> {
    return await this.findOne({ where: { id: sheetId } });
  }

  public async createItem(sheetDto: CreateSheetDto): Promise<Sheet> {

    const sheet = this.create(sheetDto);

    return this.save(sheet);
  }

  public async updateById(
    sheetId: number,
    { name, description,status,company }: UpdateSheetDto
  ): Promise<number> {
    const update = await this.update(sheetId, {
      name: name,
      status: status,
      company:company,
      description: description,
    });

    return update.affected;
  }


  public async updateStatusById(
      sheetId: number,
      { name, description,status }: UpdateSheetDto
  ): Promise<number> {
    const update = await this.update(sheetId, {
      status: status,
    });

    return update.affected;
  }

  public async deleteById(sheetId: number): Promise<number> {
    const delet = await this.delete({ id: sheetId });

    return delet.affected;
  }
}
