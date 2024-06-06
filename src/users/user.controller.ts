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
  @Get('/:id')
  public async findById(@Param('id') userId: number): Promise<User> {
    return await this.Service.findById(userId);
  }

  @ApiOperation({ summary: 'создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.Service.createItem(createUserDto);
  }

  @ApiOperation({ summary: 'Обновления пользователя по ID' })
  @ApiResponse({ status: 200 })
  @Put('/:id')
  public async updateById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') userId: number,
  ): Promise<void> {
    await this.Service.updateById(userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Задать роль Админа для пользователя по ID' })
  @ApiResponse({ status: 200 })
  @Patch('/:id')
  public async setRoleById(@Param('id') userId: number): Promise<void> {
    await this.Service.setRoleById(userId);
  }

  @ApiOperation({ summary: 'удаление пользователя по ID' })
  @ApiResponse({ status: 200 })
  @Delete('/:id')
  public async deleteById(@Param('id') userId: number): Promise<void> {
    await this.Service.deleteById(userId);
  }
}
