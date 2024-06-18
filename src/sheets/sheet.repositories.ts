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

  public async findAll(): Promise<Sheet[]> {
    return await this.find({});
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
    { name, description }: UpdateSheetDto
  ): Promise<number> {
    const update = await this.update(sheetId, {
      name: name,
      description: description,
    });

    return update.affected;
  }

  public async deleteById(sheetId: number): Promise<number> {
    const delet = await this.delete({ id: sheetId });

    return delet.affected;
  }
}
