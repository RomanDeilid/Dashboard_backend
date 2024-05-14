import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete, NotFoundException,
} from '@nestjs/common';
import { Sheet } from './entities/sheet.entity';
import { CreateSheetDto } from './entities/createSheetDto';
import {SheetService} from "./sheet.service";
import {UpdateSheetDto} from "./entities/updateSheetDto";

@Controller('/api/v1/sheets')
export class SheetController {
  constructor(private sheetService: SheetService) { }

  @Get()
  public async findAll(): Promise<Sheet[]> {
    return await this.sheetService.getAll();
  }

  @Get('/:Id')
  public async findOne(@Param('Id') sheetId: number): Promise<Sheet> {
  return await this.sheetService.getByFilters(sheetId);
  }

  @Post()
  public async create(
      @Body() createSheetDto: CreateSheetDto,
  ): Promise<Sheet> {
    return await this.sheetService.create(createSheetDto);
  }

  @Patch('/:Id')
  public async update(
      @Body() updateSheetDto: UpdateSheetDto,
      @Param('Id') sheetId: number,
  ): Promise<Sheet> {

    return await this.sheetService.updateById(
        sheetId,
        updateSheetDto,
    )
  }

  @Delete('/:Id')
  public async delete(@Param('Id') sheetId: number): Promise<void> {
    await this.sheetService.deleteById(sheetId);
  }
}