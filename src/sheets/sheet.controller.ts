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
import { Sheet } from './entities/sheet.entity';
import { CreateSheetDto } from './dto/createSheetDto';
import { UpdateSheetDto } from './dto/updateSheetDto';
import { SheetService } from './sheet.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sheets')
@Controller('/api/v1/sheets')
export class SheetController {
  constructor(private sheetService: SheetService) {}

  @ApiOperation({ summary: 'просмотр всех доск' })
  @ApiResponse({ status: 200, type: [Sheet] })
  @Get()
  public async findAll(): Promise<Sheet[]> {
    return await this.sheetService.findAll();
  }

  @ApiOperation({ summary: 'просмотр одного доски по ID' })
  @ApiResponse({ status: 200, type: Sheet })
  @Get('/:id')
  public async findById(@Param('id') sheetId: number): Promise<Sheet> {
    return await this.sheetService.findById(sheetId);
  }

  @ApiOperation({ summary: 'создание доски' })
  @ApiResponse({ status: 201, type: Sheet })
  @Post()
  public async create(@Body() createSheetDto: CreateSheetDto): Promise<Sheet> {
    return await this.sheetService.createItem(createSheetDto);
  }

  @ApiOperation({ summary: 'Обновления доски по ID' })
  @ApiResponse({ status: 200 })
  @Put('/:id')
  public async updateById(
    @Body() updateSheetDto: UpdateSheetDto,
    @Param('id') sheetId: number
  ): Promise<void> {
    await this.sheetService.updateById(sheetId, updateSheetDto);
  }

  @ApiOperation({ summary: 'удаление доски по ID' })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  @HttpCode(204)
  public async deleteById(@Param('id') sheetId: number): Promise<void> {
    await this.sheetService.deleteById(sheetId);
  }
}
