import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sheet } from './entities/sheet.entity';
import { CreateSheetDto } from './dto/createSheetDto';
import { UpdateSheetDto } from './dto/updateSheetDto';
import { SheetRepository } from './sheet.repositories';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(SheetRepository)
    private sheetRepository: SheetRepository
  ) {}

  public async findAll(): Promise<Sheet[]> {
    return await this.sheetRepository.findAll();
  }

  public async findById(sheetId: number): Promise<Sheet> {
    try {
      const sheet = await this.sheetRepository.findById(sheetId);
      if (!sheet) {
        throw new Error();
      }

      return sheet;
    } catch (error) {
      throw new HttpException(
        ` Bad request, sheet by ID=${sheetId} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async createItem(createSheetDto: CreateSheetDto): Promise<Sheet> {
    try {
      return await this.sheetRepository.createItem(createSheetDto);
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(
          'Bad request, this sheet already exists',
          HttpStatus.BAD_REQUEST
        );
      }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateById(
    sheetId: number,
    updateSheetDto: UpdateSheetDto
  ): Promise<void> {
    try {
      const updateSheet = await this.sheetRepository.updateById(
        sheetId,
        updateSheetDto
      );
      if (!updateSheet) {
        throw new Error();
      }
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(
          'Bad request, this sheet already exists',
          HttpStatus.BAD_REQUEST
        );
      }
        throw new HttpException(
          ` Bad request, sheet by ID=${sheetId} not found`,
          HttpStatus.BAD_REQUEST
        );
    }
  }

  public async deleteById(sheetId: number): Promise<void> {
    try {
      const deletedSheet = await this.sheetRepository.deleteById(sheetId);
      if (!deletedSheet) {
        throw new Error();
    }} catch (error) {
      throw new HttpException(
        `Bad request, sheet by ID=${sheetId} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
