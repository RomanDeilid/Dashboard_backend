import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../enums/users';
import { UpdateResult } from 'typeorm';

@ApiTags('Users')
@Controller('/api/v1/users')
export class UserController {
  constructor(private Service: UserService) {}

  @ApiOperation({ summary: 'просмотр всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  public async findAll(): Promise<User[]> {
    return await this.Service.findAll();
  }

  @ApiOperation({ summary: 'просмотр одного пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:Id')
  public async findById(@Param('Id') userId: number): Promise<User> {
    return await this.Service.findById(userId);
  }

  @ApiOperation({ summary: 'создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.Service.createItem(createUserDto);
  }

  @ApiOperation({ summary: 'Обновления пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:Id')
  public async updateById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('Id') userId: number,
  ): Promise<User> {
    return await this.Service.updateById(userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Обновления пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  @Patch('/:Id')
  public async updateRoleById(@Param('Id') userId: number): Promise<void> {
    await this.Service.updateRoleById(userId);
  }

  @ApiOperation({ summary: 'удаление пользователя по ID' })
  @Delete('/:Id')
  public async deleteById(@Param('Id') userId: number): Promise<void> {
    await this.Service.deleteById(userId);
  }
}
