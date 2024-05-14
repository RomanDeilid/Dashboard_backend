import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { Sheet } from './entities/sheet.entity';
import { CreateSheetDto } from './entities/createSheetDto';
import { UpdateSheetDto } from './entities/updateSheetDto';
import { SheetRepository } from './sheet.repositories';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SheetService {
    constructor(
        @InjectRepository(SheetRepository)
        private   sheetRepository: SheetRepository) {}

    public async  getAll(): Promise<Sheet[]> {
        return await this.sheetRepository.findAll();
    }

    public async getByFilters (sheetId: number): Promise<Sheet> {
        const sheet = await this.sheetRepository.findById(sheetId);
        if (!sheet) {
            throw new NotFoundException(`Sheet #${sheetId} not found`);
        }
        return sheet;
    }

    public async create(
        createSheetDto: CreateSheetDto,
    ): Promise<Sheet> {
        try {
            return await this.sheetRepository.createItem(createSheetDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async updateById(
        sheetId: number,
        updateSheetDto: UpdateSheetDto
    ): Promise<Sheet> {
        if (!await this.sheetRepository.findById(sheetId)) {
        throw new NotFoundException(`Sheet #${sheetId} not found`);
    }
        return this.sheetRepository.updateById(sheetId, updateSheetDto);
    }

    public async deleteById(sheetId: number): Promise<void> {
        const sheet = await this.getByFilters(sheetId);
        if (!sheet) {
            throw new NotFoundException(`Sheet #${sheetId} not found`);
        }
        await this.sheetRepository.deleteById(sheetId);
    }
}