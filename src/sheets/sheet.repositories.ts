import {Repository, DataSource} from 'typeorm';
import { Sheet} from "./entities/sheet.entity";
import { CreateSheetDto } from './entities/createSheetDto';
import { UpdateSheetDto } from './entities/updateSheetDto';
import {Injectable} from "@nestjs/common";
@Injectable()
export class SheetRepository extends Repository<Sheet> {
     constructor(private dataSource: DataSource) {
         super(Sheet, dataSource.createEntityManager());
     }

    public async findAll(): Promise<Sheet[]> {
        return await this.find({});
    }

    public async findById (sheetId: number): Promise<Sheet> {
        return await this.findOne({ where: {id: sheetId} });
    }

    public async createItem( {name, description }: CreateSheetDto): Promise<Sheet> {
        const sheet = this.create({name, description});
        await this.save(sheet);
        return sheet;
    }

    public async updateById(userId: number, { name, description }: UpdateSheetDto,): Promise<Sheet> {
        const sheet = await this.findOne({ where: {id: userId} });
        sheet.name = name;
        sheet.description = description;
        await this.save(sheet);
        return sheet;
    }

    public async deleteById (sheetId: number): Promise<void> {
        const sheet = await this.findOne({ where: {id: sheetId} });
        await this.remove(sheet);
    }
}

