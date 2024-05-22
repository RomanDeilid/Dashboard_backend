import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Sheet } from './entities/sheet.entity';
import { CreateSheetDto } from './entities/createSheetDto';
import { SheetService } from './sheet.service';
import { UpdateSheetDto } from './entities/updateSheetDto';

@Controller('/api/v1/sheets')
export class SheetController {
  constructor(private sheetService: SheetService) {}

  @Get()
  public async findAll_sheet(): Promise<Sheet[]> {
    return await this.sheetService.findAll();
  }

  @Get('/:Id')
  public async findById_sheet(@Param('Id') sheetId: number): Promise<Sheet> {
    return await this.sheetService.findById(sheetId);
  }

  @Post()
  public async create_sheet(
    @Body() createSheetDto: CreateSheetDto,
  ): Promise<Sheet> {
    return await this.sheetService.createItem(createSheetDto);
  }

  @Patch('/:Id')
  public async update_sheet(
    @Body() updateSheetDto: UpdateSheetDto,
    @Param('Id') sheetId: number,
  ): Promise<Sheet> {
    return await this.sheetService.updateById(sheetId, updateSheetDto);
  }

  @Delete('/:Id')
  public async delete_sheet(@Param('Id') sheetId: number): Promise<void> {
    await this.sheetService.deleteById(sheetId);
  }
}
